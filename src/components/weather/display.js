// JS Imports
import { doc } from "prettier";
import getTimeAndDay from "../input/date";

// Selectors
const weatherDataCurrent = document.querySelector(".weather-container.current");
const timeOfDay = document.querySelectorAll(".time-of-day");
const additional = document.querySelector(".additional-today");
const weatherContainers = document.querySelectorAll(".weather-container");
const daysTemperature = document.querySelectorAll(".days-temperature");
const daysIcon = document.querySelectorAll(".days-icon");
const daysHumidity = document.querySelectorAll(".days-humidity");
const daysPrecipitation = document.querySelectorAll(".days-precipitation");
const daysWindSpeed = document.querySelectorAll(".days-wind-speed");
const dayNames = document.querySelectorAll(".day-name");

const convertCelsius = (f) => {
  let c = (f - 32) * (5 / 9);
  return Math.round(c);
};

const convertFarenheit = (c) => {
  let f = c * (5 / 9) + 32;
  return Math.round(f);
};

const capitalise = (desc) => {
  let newSentence = "";
  let sentence = desc.split(" ");

  let m = sentence.forEach((word, index) => {
    let newWord = "";
    for (let i = 0; i < word.length; i += 1) {
      i === 0
        ? (newWord += word.charAt(i).toUpperCase())
        : (newWord += word.charAt(i));
    }
    newSentence += newWord;
    if (index !== desc.length - 1) {
      newSentence += " ";
    }
  });
  return newSentence;
};

const weatherDisplayModule = (() => {
  function showTime(offset) {
    let time = getTimeAndDay(offset);
    weatherDataCurrent.children[1].innerHTML = `As of ${time.time}`;
    for (let i = 0; i < 7; i += 1) {
      dayNames[i].innerHTML = time.upcomingDays[i];
    }
  }

  const displayCurrent = (target, offset) => {
    const place = { city: target.city, country: target.country };
    const current = target.current;
    weatherDataCurrent.children[0].innerHTML = `${place.city}, '${place.country}'`;
    document.querySelector(".current-temp").innerHTML = `${convertCelsius(
      current.temperature
    )}°`;
    document.querySelector(".current-icon").src = current.icon;
    document.querySelector(".current-description").innerHTML = capitalise(
      current.description
    );
    showTime(offset);
  };

  const displayToday = (target) => {
    const today = target.daily[0];
    timeOfDay[1].children[1].innerHTML =
      convertCelsius(today.temperature.morn) + "<strong>°</strong>";
    timeOfDay[2].children[1].innerHTML =
      convertCelsius(today.temperature.day) + "<strong>°</strong>";
    timeOfDay[3].children[1].innerHTML =
      convertCelsius(today.temperature.eve) + "<strong>°</strong>";
    timeOfDay[4].children[1].innerHTML =
      convertCelsius(today.temperature.night) + "<strong>°</strong>";
    additional.children[0].innerHTML = `Humidity: <strong>${today.humidity}%</strong>`;
    today.precipitation === undefined
      ? (additional.children[1].innerHTML = `Precipitation: <strong>0mm</strong>`)
      : (additional.children[1].innerHTML = `Precipitation: <strong>${today.precipitation}mm</strong>`);
    additional.children[2].innerHTML = `Wind Speed: <strong>${today.windSpeed}mph</strong>`;
  };

  const displayDaily = (target) => {
    const daily = target.daily;
    daily.shift();
    let time = getTimeAndDay();
    for (let i = 0; i < daily.length; i += 1) {
      daysTemperature[i].innerHTML = `${convertCelsius(
        daily[i].temperature.day
      )} <strong>°</strong>`;
      daysIcon[i].src = daily[i].icon;
      daysHumidity[i].innerHTML = `${daily[i].humidity} <strong>%</strong>`;
      daily[i].precipitation === undefined
        ? (daysPrecipitation[i].innerHTML = `0 <strong>mm</strong>`)
        : (daysPrecipitation[
            i
          ].innerHTML = `${daily[i].precipitation} <strong>mm</strong>`);
      daysWindSpeed[i].innerHTML = `${daily[i].windSpeed} <strong>mph</strong>`;
    }
  };

  const showContainers = () => {
    weatherContainers.forEach((container) => {
      container.classList.remove("hidden");
      window.setTimeout(() => {
        container.classList.remove("visually-hidden");
      }, 20);
    });
  };

  return { displayCurrent, displayToday, showContainers, displayDaily };
})();

export default weatherDisplayModule;
