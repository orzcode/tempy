// injector.js
import storage from "./storage.js";

const injector = () => {
  const localData = storage.getLocal("localWeatherCopy");

  const tags = {
    date: document.querySelector("#date"),
    location: document.querySelector("#location"),

    centreTemp: document.querySelector("#centreTemp"),
    centreHigh: document.querySelector("#centreHigh"),
    centreConditionImg: document.querySelector("#centreConditionImg"),
    centreConditionText: document.querySelector("#centreConditionText"),
    centrePrecipPercent: document.querySelector("#centrePrecipPercent"),
    centreWindCardinal: document.querySelector("#centreWindCardinal"),
  };

  const injMain = (ToT) => {
    tags.date.textContent = localData[`${ToT}`].date;
    tags.location.textContent = localData.location.name;

    tags.centreTemp.textContent = localData[`${ToT}`].temp_c;
    tags.centreHigh.textContent = "High: " + localData[`${ToT}`].maxtemp;

    tags.centreConditionImg.src = localData[`${ToT}`].condition.icon;
    tags.centreConditionText.textContent = localData[`${ToT}`].condition.text;

    tags.centrePrecipPercent.textContent = "Chance: " + localData[`${ToT}`].rainchance;
    tags.centreWindCardinal.textContent = localData[`${ToT}`].wind_dir;
  };

  const injHours = (ToT) => {
    //updates DOM with HOURS for either <"Today"> or <"Tomorrow">
    const hoursToUpdate = [12, 3, 6, 9];

    for (const hour of hoursToUpdate) {
      const hourlyData = localData[`${ToT}`].hourly[hour];

      const parentElement = document.querySelector(`[data-hour="${hour}"]`);

      //
      const conditionImgElement = parentElement.querySelector(
        ".hourlyConditionImg"
      );
      const conditionTextElement = parentElement.querySelector(
        ".hourlyConditionText"
      );
      const rainChanceElement =
        parentElement.querySelector(".hourlyRainChance");
      const windDirectionElement = parentElement.querySelector(
        ".hourlyWindDirection"
      );

      // Update the content based on the hourly data
      conditionImgElement.src = hourlyData.condition.icon;
      conditionTextElement.innerText = hourlyData.condition.text;
      rainChanceElement.innerText = hourlyData.rainchance;
      windDirectionElement.innerText = hourlyData.wind_dir;
    }
  };

  const exec = (ToT) => {
          injMain(ToT);
          injHours(ToT);
  };

  return { exec };
};

export default injector;
