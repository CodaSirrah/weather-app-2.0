// JS Imports
import getTime from "../input/date";

// Selectors
const weatherDataCurrent = document.querySelector(".weather-container.current");
const timeOfDay = document.querySelectorAll(".time-of-day");
const additional = document.querySelector(".additional-today");

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
  async function showTime(offset) {
    try {
      let time = await getTime(offset);
      weatherDataCurrent.children[1].innerHTML = `As of ${time}`;
    } catch {
      console.log("err");
    }
  }

  const displayCurrent = (target, offset) => {
    const place = { city: target.city, country: target.country };
    const current = target.current;
    weatherDataCurrent.children[0].innerHTML = `${place.city}, ${place.country}`;
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
    console.log(today.precipitation);
    console.log(additional);
    timeOfDay[1].children[1].innerHTML =
      today.temperature.morn + "<strong>°</strong>";
    timeOfDay[2].children[1].innerHTML =
      today.temperature.day + "<strong>°</strong>";
    timeOfDay[3].children[1].innerHTML =
      today.temperature.eve + "<strong>°</strong>";
    timeOfDay[4].children[1].innerHTML =
      today.temperature.night + "<strong>°</strong>";
    additional.children[0].innerHTML = `Humidity: <strong>${today.humidity}%</strong>`;
    today.precipitation === undefined
      ? (additional.children[1].innerHTML = `Precipitation: <strong>0mm</strong>`)
      : (additional.children[1].innerHTML = `Precipitation: <strong>${today.precipitation}mm</strong>`);
    additional.children[2].innerHTML = `Wind Speed: <strong>${today.windSpeed}mph</strong>`;
  };

  return { displayCurrent, displayToday };
})();

export default weatherDisplayModule;
