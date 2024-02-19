import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";
import DOM from "./DOM.js";

console.log(storage.props().location())
//REMOVE THIS ONCE FINISHED


//storage.props().location("christchurch")
//console.log(storage.getLocal("localWeatherCopy"))

injector().exec("today");
DOM().applyListeners()


