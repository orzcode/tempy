// DOM.js
import apiMgr from "./apiMgr.js";
import injector from "./injector.js";
import storage from "./storage.js";

const DOM = () => {
  const locField = document.getElementById("location"); // Main Location field
  const splashLocField = document.getElementById("splashLocation"); // Splash location field

  const splashScreen = document.querySelector("dialog");

  const applyListeners = () => {
    document
      .querySelector("#today")
      .addEventListener("click", () => injector().exec("today"));
    document
      .querySelector("#tomorrow")
      .addEventListener("click", () => injector().exec("tomorrow"));
    //Displays/injects weather data for today or tomorrow
    //takes this data from locally saved copy.

    locField.addEventListener("keydown", () => inputEnter(locField));
    //events related to entering new location
    //eg updating location, fetching, error handling via validity class, etc

    locField.addEventListener(
      "keydown",
      () => removeValidityClass(locField)
      //removes 'invalid' class highlight when backspacing
    );

    splashLocField.addEventListener("keydown", () =>
      inputEnter(splashLocField)
    );
    //events related to entering new location
    //eg updating location, fetching, error handling via validity class, etc

    splashLocField.addEventListener(
      "keydown",
      () => removeValidityClass(splashLocField)
      //removes 'invalid' class highlight when backspacing
    );
  };

  const inputEnter = async (inputField) => {
    const form = inputField.closest("form");
    const button = form.querySelector('button[type="submit"]');
    //a hidden submit button for the 'form'.
    //currently unused.

    if (event.key === "Enter") {
      //console.log(event.key + " key pressed on input");

      ///////////////////////
      event.preventDefault();
      //    seemingly important to prevent refresh even without submission
      //    as well as to preventing alert msg popping up
      ///////////////////////

      //IF THE PATTERN IS INVALID:
      if (!inputField.checkValidity()) {
        console.log("Invalid input pattern - numbers, or whatever");
        inputField.classList.add("inputValidity");
        //applies 'invalid' css class to input field
      }

      //ELSE IF THE PATTERN IS VALID:
      else {
        //button.click(); //--submits form via hidden button - currently unused
        event.preventDefault();
        storage.props().location(inputField.value); /////////<-culprit

        if ((await apiMgr().apiFetcher()) !== false) {
          injector().exec("today");
          splashFade();
        } else {
          console.log("Invalid input pattern - numbers, or whatever");
          inputField.classList.add("inputValidity");
        }
      }
    }
  };

  const removeValidityClass = (inputField) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      console.log(event.key + " key pressed on input");

      inputField.classList.remove("inputValidity");
    }
  };

  // form.addEventListener("submit", function (event) {
  //   console.log("Submission event triggered via (fake) button.click()");
  //   event.preventDefault();
  //   // Your code to execute when the form is valid
  // });
  //
  // linked to 'hidden' submit button - currently unused

  const splashFade = () => {
    //blurs/fades out the splashscreen
    
    splashScreen.style.opacity = 0;
    splashLocField.blur();

    // After the transition duration, close the dialog
    setTimeout(() => {
      splashScreen.close();
    }, 1000); //
  };

  return { applyListeners };
};

export default DOM;
