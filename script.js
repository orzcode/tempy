const api = (location) => {
  const key64 = "MTU4ZTQ3ZjI2NjI0NGIwMzliMjExNDQxMjQxODAx";
  const key = atob(key64);
  const apiURL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${location}&aqi=no`;
	fetch(apiURL, {mode: 'cors'})
    .then(function (response) {
		console.log(response.json());
    return response.json()
    })
    .catch(function (err) {
      //console.log("Error: " + err)
      return err;
    });
};
api("christchurch")