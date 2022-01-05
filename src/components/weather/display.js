// JS Imports
import getTime from "../input/date";

// Selectors
const weatherDataCurrent = document.querySelector(".weather-container.current");
// const weatherData = document.querySelector(".weather-data");

console.log(weatherDataCurrent);

const convertCelsius = (f) => {
  let c = (f - 32) * (5 / 9);
  return Math.round(c);
};

const convertFarenheit = (c) => {
  let f = c * (5 / 9) + 32;
  return Math.round(f);
};

let x = "a good day";

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
    if (index !== x.length - 1) {
      newSentence += " ";
    }
  });
  return newSentence;
};

const weatherDisplayModule = (() => {
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

  async function showTime(offset) {
    try {
      let time = await getTime(offset);
      weatherDataCurrent.children[1].innerHTML = `As of ${time}`;
    } catch {
      console.log("err");
    }
  }
  const displayDaily = (target) => {
    const daily = target.daily;
    for (let x = 0; x < target.length; x += 1) {}
  };

  return { displayCurrent, displayDaily };
})();

export default weatherDisplayModule;
