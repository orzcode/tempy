// DOM.js
import injector from "./injector.js";
import storage from "./storage.js";

const DOM = () => {
	const locField = document.getElementById("location");

	const applyListeners = () => {
		document.querySelector("#today").addEventListener("click", () => injector().exec("today"));
		document.querySelector("#tomorrow").addEventListener("click", () => injector().exec("tomorrow"));

		locField.addEventListener("keypress", () => updateLocation())
	}

	const updateLocation = () => {
		if (event.key === "Enter") {
			// Form preventDefault
			event.preventDefault();
			
			// Do this stuff once Enter is pressed:
			storage.props().location(locField.value);			
			injector().exec("today")			
		  }
	}

	return { applyListeners }
}

export default DOM