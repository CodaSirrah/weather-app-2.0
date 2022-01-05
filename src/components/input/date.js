const addZeroes = (num) => {
  return num < 10 ? `0${num}` : num;
};

const getTime = (offset) => {
  const date = new Date();
  let hours = addZeroes(date.getUTCHours()) + offset;
  let minutes = addZeroes(date.getUTCMinutes());
  let seconds = addZeroes(date.getUTCSeconds());
  let time = `${hours}:${minutes}:${seconds}`;
  if (offset === 0) {
    return `${time} GMT`;
  } else if (offset > 0 && offset < 10) {
    return `${time} GMT+0${offset}:00`;
  } else if (offset > 0 && offset >= 10) {
    return `${time} GMT+${offset}:00`;
  } else if (offset > 0 && offset < -10) {
    return `${time} GMT0${offset}:00`;
  } else {
    return `${time} GMT${offset}:00`;
  }
};
export default getTime;
