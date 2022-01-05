// CSS imports
import "./input.css";

// Selectors
const input = document.querySelector(".city-input");
const label = document.querySelector("label");
const inputContainer = document.querySelector(".input-container");

const clearInput = () => {
  return (input.value = "");
};

const labelVisibility = () => {
  return input.value ? (label.textContent = "") : (label.textContent = "City:");
};

const loadInput = () => {
  inputContainer.classList.remove("hidden");
  window.setTimeout(() => {
    inputContainer.classList.remove("visually-hidden");
  }, 20);
};

loadInput();

export { labelVisibility, clearInput };
