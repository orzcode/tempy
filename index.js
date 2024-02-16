import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";

//console.log(storage.props().location())
//storage.props().location("christchurch")

////////////////////////////////////////////


 let obj = apiMgr().getData();


injector().exec("tomorrow")


