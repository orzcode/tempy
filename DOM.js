// DOM.js
import injector from "./injector.js";
import storage from "./storage.js";

const DOM = () => {
	const locField = document.getElementById("location"); // Main Location field
	const splashLocField = document.getElementById("splashLocation"); // Splashscreen Location field

	const applyListeners = () => {
		document.querySelector("#today").addEventListener("click", () => injector().exec("today"));
		document.querySelector("#tomorrow").addEventListener("click", () => injector().exec("tomorrow"));

		locField.addEventListener("keypress", () => updateLocation(locField));
		splashLocField.addEventListener("keypress", () => updateLocation(splashLocField));
	}

	const updateLocation = (inputField) => {
		if (event.key === "Enter") {
			event.preventDefault();

			storage.props().location(inputField.value);
			injector().exec("today");

			document.querySelector("dialog").close()
		}
	}

	return { applyListeners };
}

export default DOM