// DOM.js
import injector from "./injector.js";

const DOM = () => {
	const applyListeners = () => {
		document.querySelector("h2#today").addEventListener("click", injector().exec("today"));
		document.querySelector("h2#tomorrow").addEventListener("click", injector().exec("tomorrow"));
	}

	return { applyListeners }
}

export default DOM