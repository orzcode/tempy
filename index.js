import storage from "./storage.js";

const apiMgr = () => {
  const { realTimeDataURL, hourlyDataURL } = storage.props();

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

  const getData = (queryType) => {
    switch(queryType) {
      case "current":
        apiFetcher(realTimeDataURL());
        break;
      case "hourly":
        apiFetcher(hourlyDataURL());
        break;
    }
  }

  return { getData };
};

apiMgr().getData("hourly")



const dataProcessor = (returnedJson) => {
  const newObj = {
    location: {
      name: returnedJson.location.name,
      country: returnedJson.location.country,
      localtime: returnedJson.location.localtime,
    },
    current: {
      temp_c: returnedJson.current.temp_c,
      is_day: returnedJson.current.is_day,
      wind_dir: returnedJson.current.wind_dir,
      precip_mm: returnedJson.current.precip_mm,
      condition: {
        text: returnedJson.current.condition.text,
        icon: returnedJson.current.condition.icon,
        code: returnedJson.current.condition.code,
      },
    },
  };
  console.log(newObj);
  return newObj;
};
