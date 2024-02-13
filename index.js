import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";

let obj = apiMgr().getData();
console.log(obj.location)
