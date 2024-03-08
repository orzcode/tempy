import storage from "./storage.js";
import conditionsJSON from "./conditionsJSON.json";
import { format, parseISO, parse, addDays } from "date-fns";

const apiMgr = () => {
  const apiURL = storage.props().forecastURL();
  //settled on one type of fetch URL

  const apiFetcher = async () => {
    try {
      const response = await fetch(apiURL, { mode: "cors" });

      if (response.ok) {
        console.log("API response ok")
        const data = await response.json();

        console.log("Raw API Data:", data);
        //to check the raw API data

        formatMgr(data);
        //IF the response is OK, sends data to formatter function

      } else 
        throw new Error(response);      
    } catch (error) {
      console.error("API response failed - Invalid city name entered");
      return false
    }
  };

  const formatMgr = async (rawObj) => {
    //does everything needed to reconstruct / format the data.

      const result = rawObj;

      const processedData = dataProcessor(result);

      const fixedData = dateFormatter(processedData);

      const finalData = conditionTextFormatter(fixedData);

      const finalData2 = currentRainFormatter(finalData, result);

      console.log("Final API Data:", finalData2);
      //checks the Processed & Fixed Data

      locallyStore(finalData2);
      //stores local copy to use instead of calling API each time

      return finalData2;
  };

  const locallyStore = (obj) => {
    storage.setLocal("localWeatherCopy", obj);
  };
  //stores the data Locally to use.

  const dateFormatter = (processedObj) => {
    //formats dates in the object
    const today = format(
      processedObj.location.localtime,
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    //accounts for missing 0 if hour is single digit. sigh.
    const tomorrow = addDays(today, 1);

    const todayFormatted = format(parseISO(today), "E, do MMMM");
    const tomorrowFormatted = format(tomorrow, "E, do MMMM");
    //EEEE for full day name

    processedObj.today.date = todayFormatted;
    processedObj.tomorrow.date = tomorrowFormatted;

    return processedObj;
  };

  const conditionTextFormatter = (processedObj) => {
    const traverseObject = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (key === "condition") {
          // Convert code to string (so JSON accepts it) and update the text based on JSON
          const codeAsString = obj[key].code.toString();
          obj[key].text = conditionsJSON[codeAsString].text;
        } else if (typeof obj[key] === "object") {
          traverseObject(obj[key]);
          //recursive function - if the key is another sub-object
        }
      });
    };
    // Start traversing the object
    traverseObject(processedObj);
    return processedObj;
  };

  const currentRainFormatter = (processedObj, ogObj) => {
    //gets the rainchance for the CURRENT hour at time of fetch.
    //we do this because the 'daily rain chance' is a bit bullshit for the current time.
    const objLocaltime = processedObj.location.localtime;
    const parseHour = parse(objLocaltime, "yyyy-MM-dd HH:mm", new Date());
    const currentHour = format(parseHour, "H");

    processedObj.today.rainchance =
      ogObj.forecast.forecastday[0].hour[currentHour].chance_of_rain + "%";
    return processedObj;
  };

  const maxTempFormatter = (ogObj, day) => {
    //this function gets called from DataProcessor
    const hourArr = [];
    for (let i = 0; i < 24; i++) {
      const hourlyTemp = ogObj.forecast.forecastday[day].hour[i].temp_c;
      hourArr.push(hourlyTemp);
    }
    //make array of 0-24 hourly temps

    let highestNumber = hourArr[0];
    hourArr.forEach((tempVal) => {
      if (tempVal > highestNumber) {
        highestNumber = tempVal;
      }
    });
    //find highest temperature amongst those 24 hour temps
    return Math.trunc(highestNumber) + "°";
  };

  return { apiFetcher, maxTempFormatter, apiMgr };
};

/////////////////////////////////////////

const dataProcessor = (returnedJson) => {
  // hour should be 0-24
  // day should be 0 or 1

  // Re-constructs API data into usable object
  // Also applies some minor formatting such as adding % or degree, or truncating
  //
  // Ideally this should be done elsewhere, as I also have another dateFormat function
  // However since these are small changes and this is a small project, I'm allowing it!

  const location = {
    name: returnedJson.location.name,
    country: returnedJson.location.country,
    localtime: returnedJson.location.localtime,
  };

  const getHourlyData = (day, hour) => ({
    temp_c:
      Math.trunc(returnedJson.forecast.forecastday[day].hour[hour].temp_c) +
      "°",
    //removes decimals
    dayNight: returnedJson.forecast.forecastday[day].hour[hour].is_day
      ? "day"
      : "night",
    wind_dir: returnedJson.forecast.forecastday[day].hour[hour].wind_dir,
    rainchance:
      returnedJson.forecast.forecastday[day].hour[hour].chance_of_rain + "%",
    condition: {
      text: returnedJson.forecast.forecastday[day].hour[hour].condition.text,
      icon: returnedJson.forecast.forecastday[day].hour[
        hour
      ].condition.icon.replace(
        /\/\/cdn.weatherapi.com\/weather\/64x64\//,
        "images/conditions/"
      ),
      code: returnedJson.forecast.forecastday[day].hour[hour].condition.code,
    },
  });

  const today = {
    // date gets added in after this
    temp_c: Math.trunc(returnedJson.current.temp_c) + "°",

    maxtemp:
      //due to bullshit api not showing real max temp
      //this calls a function to get the real max temp.
      //
      //decimal trunc and degree symbol applied within function.
      apiMgr().maxTempFormatter(returnedJson, 0),

    dayNight: returnedJson.current.is_day ? "day" : "night",
    wind_dir: returnedJson.current.wind_dir,
    rainchance: returnedJson.forecast.forecastday[0].day.daily_chance_of_rain,
    //gets re-formatted to current hour during getData

    condition: {
      text: returnedJson.current.condition.text,
      icon: returnedJson.current.condition.icon.replace(
        /\/\/cdn.weatherapi.com\/weather\/64x64\//,
        "images/conditions/"
      ),
      code: returnedJson.current.condition.code,
    },
    hourly: {
      12: getHourlyData(0, 12),
      3: getHourlyData(0, 15),
      6: getHourlyData(0, 18),
      9: getHourlyData(0, 21),
      //must be 24h format
    },
  };

  const tomorrow = {
    // date gets added in after this
    temp_c:
      Math.trunc(returnedJson.forecast.forecastday[1].day.maxtemp_c) + "°",

    maxtemp: apiMgr().maxTempFormatter(returnedJson, 1),
    //

    dayNight: returnedJson.forecast.forecastday[1].hour[16].is_day
      ? "day"
      : "night",
    //want 'tomorrow' main to always be day - so grabs 4pm 'isday',
    wind_dir: returnedJson.forecast.forecastday[1].hour[16].wind_dir,
    //grabs the 4pm wind direction

    rainchance:
      returnedJson.forecast.forecastday[1].day.daily_chance_of_rain + "%",
    condition: {
      text: returnedJson.forecast.forecastday[1].day.condition.text,
      icon: returnedJson.forecast.forecastday[1].day.condition.icon.replace(
        /\/\/cdn.weatherapi.com\/weather\/64x64\//,
        "images/conditions/"
      ),
      code: returnedJson.forecast.forecastday[1].day.condition.code,
    },
    hourly: {
      12: getHourlyData(1, 12),
      3: getHourlyData(1, 15),
      6: getHourlyData(1, 18),
      9: getHourlyData(1, 21),
      //must be 24h format
    },
  };

  return {
    location,
    today,
    tomorrow,
  };
};

export default apiMgr;
