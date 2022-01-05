// CS imports
import "./weather.css";
// JS imports
import icons from "./icons.js";
import weatherDisplayModule from "./display";

// Selectors
const weatherContainer = document.querySelector(".weather-container");

const weatherModule = (() => {
  let data = {};

  // Returns object containing coordinates, city and country of searched city.

  async function getCoordinates(target) {
    try {
      const getCity = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${target}&appid=4cb92c5e21465a098adfe5ac36998bda`,
        {
          mode: "cors",
        }
      );
      const json = await getCity.json();
      return (data = {
        coords: await json.city.coord,
        city: await json.city.name,
        country: await json.city.country,
      });
    } catch (error) {
      console.log("error");
    }
  }

  // Uses prior function as argument for new feth request using coordinates for daily forecast.

  async function getLocation(placeData) {
    try {
      const fullfilled = await placeData;
      getLocation = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${fullfilled.coords.lat}&lon=${fullfilled.coords.lon}&units=imperial&exclude=minutely,hourly&appid=4cb92c5e21465a098adfe5ac36998bda`,
        {
          mode: "cors",
        }
      );
      const json = await getLocation.json();
      storeWeather(json, fullfilled);
    } catch (error) {
      console.log("error");
    }
  }

  // collects and returns weather object with necessary data.

  function storeWeather(mainData, extras) {
    const offsetTime = mainData.timezone_offset / 3600;
    const weather = {
      city: extras.city,
      country: extras.country,
      current: {
        description: mainData.current.weather[0].description,
        icon: icons[mainData.current.weather[0].icon],
        temperature: mainData.current.temp,
        feelsLike: mainData.current.feels_like,
        humidity: mainData.current.humidity,
        windSpeed: mainData.current.wind_speed,
      },
      daily: [],
    };
    for (let x = 0; x < mainData.daily.length; x += 1) {
      weather.daily.push({
        description: mainData.daily[x].weather[0].description,
        icon: icons[mainData.daily[x].weather[0].icon],
        temperature: mainData.daily[x].temp,
        humidity: mainData.daily[x].humidity,
        precipitation: mainData.daily[x].rain,
        windSpeed: mainData.daily[x].wind_speed,
      });
    }
    console.log(weather);
    weatherDisplayModule.displayCurrent(weather, offsetTime);
  }

  return { getCoordinates, getLocation };
})();

export default weatherModule;
