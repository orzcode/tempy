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

  const updateElementContent = (element, content) => {
    if (element) {
      element.textContent = content;
    }
  };

  const injMain = (ToT) => {
    const data = localData[ToT];

    updateElementContent(tags.date, data.date);
    updateElementContent(tags.location, localData.location.name);
    updateElementContent(tags.centreTemp, data.temp_c);
    updateElementContent(tags.centreHigh, `High: ${data.maxtemp}`);
    updateElementContent(tags.centreConditionImg, data.condition.icon);
    updateElementContent(tags.centreConditionText, data.condition.text);
    updateElementContent(tags.centrePrecipPercent, `Chance: ${data.rainchance}`);
    updateElementContent(tags.centreWindCardinal, data.wind_dir);
  };

  const injHours = (ToT) => {
    const hoursToUpdate = [12, 3, 6, 9];

    for (const hour of hoursToUpdate) {
      const hourlyData = localData[ToT].hourly[hour];
      const parentElement = document.querySelector(`[data-hour="${hour}"]`);

      const conditionImgElement = parentElement.querySelector(".hourlyConditionImg");
      const conditionTextElement = parentElement.querySelector(".hourlyConditionText");
      const rainChanceElement = parentElement.querySelector(".hourlyRainChance");
      const windDirectionElement = parentElement.querySelector(".hourlyWindDirection");

      updateElementContent(conditionImgElement, hourlyData.condition.icon);
      updateElementContent(conditionTextElement, hourlyData.condition.text);
      updateElementContent(rainChanceElement, hourlyData.rainchance);
      updateElementContent(windDirectionElement, hourlyData.wind_dir);
    }
  };

  const exec = (ToT) => {
    injMain(ToT);
    injHours(ToT);
  };

  return { exec };
};

export default injector;
