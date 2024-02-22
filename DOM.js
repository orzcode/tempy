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

// 	// Get the input field
// var input = document.getElementById("myInput");

// Execute a function when the user presses a key on the keyboard
// input.addEventListener("keypress", function(event) {
//   // If the user presses the "Enter" key on the keyboard
//   if (event.key === "Enter") {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     document.getElementById("myBtn").click();
//   }
// });

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