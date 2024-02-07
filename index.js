import storage from "./storage.js";

const apiMgr = () => {
  const forecastURL = storage.props().forecastURL;

  const apiFetcher = async (queryType) => {
    try {
      const apiURL = queryType;

      const response = await fetch(apiURL, { mode: "cors" });
      const data = await response.json();

      console.log(data)
      //dataProcessor(data);
      //sends Object to be pruned

      return data;
    } catch (error) {
      //console.error("Error: ", error);
      //throw error;
    }
  };

  const getData = () => {
    const data = apiFetcher(forecastURL());
   dataProcessor(data);
   //init error
  }

  return { getData };
};

apiMgr().getData()


//We want:
//HOURLY 12/3/6/9 temp/precip/conditionImg (for a given day) 
//and
//date, temp (curr. and/or avg.), high, condition, condition image/code,
//rain chance, wind dir. (for a given day)



const dataProcessor = (returnedJson) => {
  // hour should be 0-24
  // day should be 0 or 1

  const location = {
    name: returnedJson.location.name,
    country: returnedJson.location.country,
    localtime: returnedJson.location.localtime,
  };

  const getHourlyData = (day, hour) => ({
    temp_c: returnedJson.forecast.forecastday[day].hour[hour].temp_c,
    is_day: returnedJson.forecast.forecastday[day].hour[hour].is_day,
    wind_dir: returnedJson.forecast.forecastday[day].hour[hour].wind_dir,
    rainchance: returnedJson.forecast.forecastday[day].hour[hour].chance_of_rain,
    condition: {
      text: returnedJson.forecast.forecastday[day].hour[hour].condition.text,
      icon: returnedJson.forecast.forecastday[day].hour[hour].condition.icon,
      code: returnedJson.forecast.forecastday[day].hour[hour].condition.code,
    },
  });

  const today = {
    temp_c: returnedJson.current.temp_c,
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
      3: getHourlyData(0, 3),
      6: getHourlyData(0, 6),
      9: getHourlyData(0, 9),
    },
  };

  const tomorrow = {
    temp_c: returnedJson.forecast.forecastday[1].day.maxtemp_c,
    wind_dir: returnedJson.forecast.forecastday[1].day.wind_dir,
    rainchance: returnedJson.forecast.forecastday[1].day.daily_chance_of_rain,
    condition: {
      text: returnedJson.forecast.forecastday[1].day.condition.text,
      icon: returnedJson.forecast.forecastday[1].day.condition.icon,
      code: returnedJson.forecast.forecastday[1].day.condition.code,
    },
    hourly: {
      12: getHourlyData(1, 12),
      3: getHourlyData(1, 3),
      6: getHourlyData(1, 6),
      9: getHourlyData(1, 9),
    },
  };

  console.log(today)
  return {
    location,
    today,
    tomorrow,
  };
};
