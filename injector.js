// injector.js
import apiMgr from "./apiMgr.js";
import storage from "./storage.js";

const injector = () => {
  const localData = storage.getLocal("localWeatherCopy");

  //remove this/rewrite. gotta use data from localstorage, and gotta include a today/tomrow param?
  // const day = (day) => {
    
  //       inject(day);
    
  // };

  const inject = (day) => {
    console.log(localData);
    console.log("Obj retrieved, 'inject' has injected");

    const tags = {
      date: document.querySelector("#date"),
      location: document.querySelector("#location"),
      
      centreTemp: document.querySelector("#centreTemp"),
      centreHigh: document.querySelector("#centreHigh"),
      centreConditionImg: document.querySelector("#centreConditionImg"),
      centreConditionText: document.querySelector("#centreConditionText"),
      centrePrecipPercent: document.querySelector("#centrePrecipPercent"),
      centreWindCardinal: document.querySelector("#centreWindCardinal"),

      3: document.querySelectorAll('[data-hour="3pm"]'),
      12: document.querySelectorAll('[data-hour="12pm"]'),
      6: document.querySelectorAll('[data-hour="6pm"]'),
      9: document.querySelectorAll('[data-hour="9pm"]'),
      //is this right?!
    };

    tags.location.textContent = obj.location.name;
    tags.date.textContent = obj.location.localtime;
    tags.centreTemp.textContent = obj.location.name;
	//careful! this needs to be dynamic for tomorrow too
  };

  return { exec };
};

export default injector;
