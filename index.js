import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";
import DOM from "./DOM.js";


//storage.clear()

//storage.props().location("christchurch")
//REMOVE THIS ONCE FINISHED

//console.log(storage.getLocal("localWeatherCopy"))

injector().exec("today");
DOM().applyListeners()


const noLocation = (() => {
	//runs automatically at pageload
	//checks to see if a location is set.
	//if not, shows splashscreen to let user enter location.
	const locData = localStorage.getItem("location");
	if(locData === null){
		document.querySelector("dialog").show()
	}
})()