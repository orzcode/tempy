const api = () => {
  const apiURL = "http://api.weatherapi.com/v1/current.json?key=158e47f266244b039b211441241801&q=Christchurch&aqi=no";
	fetch(apiURL, {mode: 'cors'})
    .then(function (response) {
		console.log(response.json());
    })
    .catch(function (err) {
      // Error :(
    });
};
api()