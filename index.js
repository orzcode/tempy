import storage from "./storage.js";
import apiMgr from "./apiMgr.js";


let obj = apiMgr().getData();
console.log(obj.location)
