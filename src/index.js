// CSS imports
import "./assets/reset.css";
import "./assets/style.css";

// JS imports
import weatherModule from "./components/weather/weather";
import weatherDisplayModule from "./components/weather/display";
import { labelVisibility, clearInput } from "./components/input/input";

// Selectors
const input = document.querySelector(".city-input");

document
  .querySelector(".city-input")
  .addEventListener("keyup", labelVisibility);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    weatherModule.getLocation(
      weatherModule.getCoordinates(document.querySelector(".city-input").value)
    );
    clearInput();
    input.classList.remove("outline");
    weatherDisplayModule.showContainers();
  }
});
