// storage.js
const storage = {
  // createArray(arrayName) {
  //   arrayName = [];
  //   return arrayName;
  // },

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

  // get trash() {
  //   if (localStorage.getItem("trash") !== null) {
  //     let data = localStorage.getItem("trash");
  //     return JSON.parse(data);
  //   } else return null;
  // },

  // set trash(to_be_stringified_data) {
  //   localStorage.setItem("trash", JSON.stringify(to_be_stringified_data));
  // },

  clear: () => {
    return localStorage.clear();
  },
};

export default storage;
