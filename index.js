import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";
import DOM from "./DOM.js";

//console.log(storage.props().location())
//storage.props().location("christchurch")
//console.log(storage.getLocal("localWeatherCopy"))
////////////////////////////////////////////
DOM().applyListeners()

apiMgr().getData()
//need to make getdata call injector, and the onclick be getData?

