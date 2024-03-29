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
    const key64 = "MTU4ZTQ3ZjI2NjI0NGIwMzliMjExNDQxMjQxODAx";
    const key = atob(key64);
  
    const location = (newLocation) => {
      if (newLocation) {
        storage.setLocal("location", newLocation); // Fixed to use the setLocal method from the storage object
        console.log(`New location is ${newLocation}`)
      } else return storage.getLocal("location"); // Fixed to use the getLocal method from the storage object
    };
    //Usage:
    // storage.props().location("place") to set
    // storage.props().location() to get

    const testLocation = (newLocation) => {
      if (newLocation) {
        storage.setLocal("testLocation", newLocation);
        console.log(`Test location is ${newLocation}`)
      } else return storage.getLocal("testLocation"); 
    };

    const _forecastURL = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location()}&days=2`;

    const _testURL = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${testLocation()}&days=2`;

    const forecastURL = (testLocation) => {
      if(testLocation){
        return _testURL
      }else
      return _forecastURL;
    }

    return { location, testLocation, forecastURL };

  }

};

export default storage;
