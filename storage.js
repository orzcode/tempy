// storage.js
const storage = {
  getLocal: (storageName) => {
    if (localStorage.getItem(storageName) !== null) {
      let data = localStorage.getItem(storageName);
      return JSON.parse(data);
    } else return `${storageName} localstorage is empty`;
  },

  setLocal: (storageName, value) => {
    localStorage.setItem(storageName, JSON.stringify(value));
  },

  //use just like localStorage syntax, but shorter.
  //console log "localstorage" to see ALL local stories entries.
  //remember you can use another array as a value(!)

  clear: () => {
    return localStorage.clear();
  },


  props: () => {

    let _location = "christchurch"; // Make sure to set a default location

   fuck: {
    const key64 = "MTU4ZTQ3ZjI2NjI0NGIwMzliMjExNDQxMjQxODAx";
    const key = atob(key64);
  

  
    // const location = (newLocation) => {
    //   if(newLocation){
    //     _location = newLocation
    //   }else return _location
    // }
  
    const realTimeDataURL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}`;
    const hourlyDataURL = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=2`;
  
    return {
      // get key() {
      //   return key;
      // },
      //can and does get accessed internally within this by the url itself
      
      get location() {
        return _location;
      },
      set location(newLocation) {
        _location = newLocation;
      },

      get realTimeDataURL() {
        return realTimeDataURL;
      },
      get hourlyDataURL() {
        return hourlyDataURL;
      },
    };
    //return { shit }
  };
  return fuck
  }


};

export default storage;
