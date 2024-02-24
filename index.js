import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";
import DOM from "./DOM.js";


//storage.clear()

storage.props().location("christchurch")
 console.log(storage.props().location())
//REMOVE THIS ONCE FINISHED

//console.log(storage.getLocal("localWeatherCopy"))

injector().exec("today");
DOM().applyListeners()


const noLocation = () => {
	const locData = localStorage.getItem(location);
	if(locData == null){
		//do stuff
	}
}