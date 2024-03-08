import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";
import DOM from "./DOM.js";

//storage.clear()

const pageLoad = (() => {
	DOM().applyListeners()

	//runs automatically at pageload
	//checks to see if a location is set.
	//if NO, shows splashscreen to let user enter location.
	//if YES, fetches data for that city and injects
	const locData = localStorage.getItem("location");

	if(locData === null){
		document.querySelector("dialog").show()
	}else {
		apiMgr().apiFetcher()
		//at this juncture, 
		//the location should have already been set.

		injector().exec("today");
	}
})()