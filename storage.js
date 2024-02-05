// storage.js
const storage = {
  createArray(arrayName) {
    arrayName = [];
    return arrayName;
  },

  get localStorage() {
    return (name) => {
      if (localStorage.getItem(name) !== null) {
        let data = localStorage.getItem(name);
        return JSON.parse(data);
      } else return "empty";
    };
  },

  set localStorage(to_be_stringified_data) {
    // Assuming you have a name property in to_be_stringified_data
    localStorage.setItem(
      to_be_stringified_data.N,
      JSON.stringify(to_be_stringified_data.data)
    );
    //i.e. set as { N: "example", data: "some data or function i guess" };
  },

  get trash() {
    if (localStorage.getItem("trash") !== null) {
      let data = localStorage.getItem("trash");
      return JSON.parse(data);
    } else return null;
  },

  set trash(to_be_stringified_data) {
    localStorage.setItem("trash", JSON.stringify(to_be_stringified_data));
  },

  clear: () => {
    return localStorage.clear();
  },
};

export default storage;
