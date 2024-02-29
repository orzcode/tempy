// DOM.js
import injector from "./injector.js";
import storage from "./storage.js";

const DOM = () => {
	const locField = document.getElementById("location"); // Main Location field
	const splashLocField = document.getElementById("splashLocation"); // Splash location field

	const splashScreen = document.querySelector("dialog");

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

			splashFade()
		}
	}

	const splashFade = () => {
		splashScreen.style.opacity = 0;

		splashLocField.blur()

		// After the transition duration, close the dialog
		setTimeout(() => {
			splashScreen.close();
		},1000); // 
	}

	return { applyListeners };
}

export default DOM