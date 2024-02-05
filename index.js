import storage from "./storage.js";


// https://www.w3schools.com/jsref/prop_win_localstorage.asp
// storage is busted


const props = () => {
  const key64 = "MTU4ZTQ3ZjI2NjI0NGIwMzliMjExNDQxMjQxODAx";
  const key = atob(key64);

  const _location = "christchurch"; // Make sure to set a default location

  //NEED TO SET LOCATION UPDATE

  const realTimeDataURL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${_location}`;
  const hourlyDataURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${_location}&days=2`;

  return {
    get key() {
      return key;
    },
    get location() {
      return _location;
    },
    set location(newLocation) {
      _location = newLocation;
    },
    get realTimeDataURL() {
      return realTimeDataURL;
    },
    get hourlyDataURL() {
      return hourlyDataURL;
    },
  };
};

//props().location = "testlocation";
console.log(props().location);



const apiMgr = () => {
  const { key, location, realTimeDataURL, hourlyDataURL } = props();

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
        apiFetcher(realTimeDataURL);
        break;
      case "hourly":
        apiFetcher(hourlyDataURL);
        break;
      case "future":
        apiFetcher(futureDataURL);
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
