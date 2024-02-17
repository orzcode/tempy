// DOM.js
import injector from "./injector.js";

const DOM = () => {
	const applyListeners = () => {
		document.querySelector("#today").addEventListener("click", () => injector().exec("today"));
		document.querySelector("#tomorrow").addEventListener("click", () => injector().exec("tomorrow"));
		
	}

	return { applyListeners }
}

export default DOM