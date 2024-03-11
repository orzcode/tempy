// injector.js
import storage from "./storage.js";
import apiMgr from "./apiMgr.js";
import DOM from "./DOM.js";

const injector = () => {
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
    if (element.src !== undefined) {
      element.src = content;
      //checks to see if element is an image - if so, replaces the img src
      //rather than the textconent
    } else element.textContent = content;
  };

  const injMain = (ToT) => {
    const localData = storage.getLocal("localWeatherCopy");

    const data = localData[ToT];

    updateElementContent(tags.date, data.date);
    tags.location.value = localData.location.name;
    //location field is an anomaly (input, not mere text) - hence the oddness
    updateElementContent(tags.centreTemp, data.temp_c);
    updateElementContent(tags.centreHigh, `High: ${data.maxtemp}`);
    updateElementContent(tags.centreConditionImg, data.condition.icon);
    updateElementContent(tags.centreConditionText, data.condition.text);
    updateElementContent(
      tags.centrePrecipPercent,
      `Chance: ${data.rainchance}`
    );
    updateElementContent(tags.centreWindCardinal, data.wind_dir);
  };

  const injHours = (ToT) => {
    const localData = storage.getLocal("localWeatherCopy");

    const hoursToUpdate = [12, 3, 6, 9];

    for (const hour of hoursToUpdate) {
      const hourlyData = localData[ToT].hourly[hour];
      const parentElement = document.querySelector(`[data-hour="${hour}"]`);

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

      updateElementContent(conditionImgElement, hourlyData.condition.icon);

      // updateElementContent(conditionTextElement, hourlyData.condition.text);
      // Swap this if you prefer condition text on hourly section instead of temperature
      updateElementContent(conditionTextElement, hourlyData.temp_c);

      updateElementContent(rainChanceElement, hourlyData.rainchance);
      updateElementContent(windDirectionElement, hourlyData.wind_dir);
    }
  };
  ////////////////////////////////////////////
  const exec = (ToT) => {
    //Tab color darkens based on selected tab
    const topTabs = document.querySelectorAll(".topTabsH2");
    topTabs.forEach((H2) => {
      H2.classList.remove("topTabsActive");
    });
    document.querySelector(`#${ToT}`).classList.add("topTabsActive");
    //
    const legend = document.getElementById("location").closest("form").querySelector("legend");
    legend.classList.remove("inputValidity");

    //await apiMgr().getData();
    //decided to not bother updating when clicking tabs
    //updates on pageload anyway.

    injMain(ToT);
    injHours(ToT);
  };
  ////////////////////////////////////////////
  return { exec, updateElementContent, tags };
};

export default injector;
