// injector.js
import apiMgr from "./apiMgr.js";

const injector = () => {

	const exec = () => {
		apiMgr()
		.getData()
		.then((obj) => {
			inject(obj)
	})		.catch((err) => {
		console.error("Oops, something went wrong:", err);
	  });
	}
	
	const inject = (obj) => {	 
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
		  }

		  tags.location.textContent = obj.location.name;		

	};
  
	return { exec };
  };

export default injector;
