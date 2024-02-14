import storage from "./storage.js";
import { format, parseISO, addDays } from "date-fns";

const apiMgr = () => {
  const forecastURL = storage.props().forecastURL;

  const apiFetcher = async (queryType) => {
    try {
      const apiURL = queryType;

      const response = await fetch(apiURL, { mode: "cors" });
      const data = await response.json();

      //console.log(data)

      return data;
    } catch (error) {
      throw error;
    }
  };


  const getData = async () => {
    try {
      const result = await apiFetcher(forecastURL());
      const processedData = dataProcessor(result);

      //console.log("Processed Data:", processedData)
      const fixedData = dateFormatter(processedData);

      locallyStore(fixedData);
      //console.log("Fixed Data:", fixedData);

      return fixedData;
    } catch (error) {
      throw error;
    }
  };

  const locallyStore = (obj) => {
    storage.setLocal("localWeatherCopy", obj)
  }

  const dateFormatter = (processedObj) => {
    const today = processedObj.location.localtime;

    const tomorrow = addDays(parseISO(today), 1);
    const todayFormatted = format(parseISO(today), 'EEEE, do MMMM');
    const tomorrowFormatted = format(tomorrow, 'EEEE, do MMMM');

    processedObj.today.date = todayFormatted;
    processedObj.tomorrow.date = tomorrowFormatted;

    return processedObj
}

  return { getData };
};

const dataProcessor = (returnedJson) => {
  // hour should be 0-24
  // day should be 0 or 1
  
  const location = {
    name: returnedJson.location.name,
    country: returnedJson.location.country,
    localtime: returnedJson.location.localtime,
  };

  const getHourlyData = (day, hour) => ({
    temp_c: Math.trunc(returnedJson.forecast.forecastday[day].hour[hour].temp_c),
    //removes decimals
    is_day: returnedJson.forecast.forecastday[day].hour[hour].is_day,
    wind_dir: returnedJson.forecast.forecastday[day].hour[hour].wind_dir,
    rainchance:
      returnedJson.forecast.forecastday[day].hour[hour].chance_of_rain,
    condition: {
      text: returnedJson.forecast.forecastday[day].hour[hour].condition.text,
      icon: returnedJson.forecast.forecastday[day].hour[hour].condition.icon,
      code: returnedJson.forecast.forecastday[day].hour[hour].condition.code,
    },
  });

  const today = {
    // date gets added in after this
    temp_c: Math.trunc(returnedJson.current.temp_c),
    maxtemp: Math.trunc(returnedJson.forecast.forecastday[0].day.maxtemp_c),
    //removes decimals
    is_day: returnedJson.current.is_day,
    wind_dir: returnedJson.current.wind_dir,
    rainchance: returnedJson.forecast.forecastday[0].day.daily_chance_of_rain,
    condition: {
      text: returnedJson.current.condition.text,
      icon: returnedJson.current.condition.icon,
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
    temp_c: Math.trunc(returnedJson.forecast.forecastday[1].day.maxtemp_c),
    maxtemp: Math.trunc(returnedJson.forecast.forecastday[1].day.maxtemp_c),
    //removes decimals

    is_day: returnedJson.forecast.forecastday[1].hour[16].is_day,
    //want 'tomorrow' main to always be day - so grabs 4pm 'isday',
    wind_dir: returnedJson.forecast.forecastday[1].hour[16].wind_dir,
    //grabs the 4pm wind direction

    rainchance: returnedJson.forecast.forecastday[1].day.daily_chance_of_rain,
    condition: {
      text: returnedJson.forecast.forecastday[1].day.condition.text,
      icon: returnedJson.forecast.forecastday[1].day.condition.icon,
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
