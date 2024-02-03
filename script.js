const api = async (location) => {
  try {
    const key64 = "MTU4ZTQ3ZjI2NjI0NGIwMzliMjExNDQxMjQxODAx";
    const key = atob(key64);
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;

    const response = await fetch(apiURL, { mode: 'cors' });
    const data = await response.json();

    //console.log(data);
    dataProcessor(data);

    return data;
  } catch (error) {
    //console.error("Error: ", error);
    //throw error;
  }
};
api("christchurch")


const dataProcessor = (returnedJson) => {
  newObj = {
    "location": {
        "name": returnedJson.location.name,
        "country": returnedJson.location.country,
        "localtime": returnedJson.location.localtime
    },
    "current": {
        "temp_c": returnedJson.current.temp_c,
        "is_day": returnedJson.current.is_day,
        "wind_dir": returnedJson.current.wind_dir,
        "precip_mm": returnedJson.current.precip_mm,
        "condition": {
            "text": returnedJson.current.condition.text,
            "icon": returnedJson.current.condition.icon,
            "code": returnedJson.current.condition.code
        }
    }
}
console.log(newObj)
return newObj
//   initialObj = {
//     "location": {
//         "name": "Christchurch",
//         "region": "",
//         "country": "New Zealand",
//         "lat": -43.53,
//         "lon": 172.63,
//         "tz_id": "Pacific/Auckland",
//         "localtime_epoch": 1706990695,
//         "localtime": "2024-02-04 9:04"
//     },
//     "current": {
//         "temp_c": 12,
//         "is_day": 1,
//         "condition": {
//             "text": "Sunny",
//             "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
//             "code": 1000
//         },
//         "wind_dir": "ENE",
//         "precip_mm": 0
//     }
// }
}

