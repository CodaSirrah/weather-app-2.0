const addZeroes = (num) => {
  return num < 10 ? `0${num}` : num;
};

const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const getTimeAndDay = (offset) => {
  const date = new Date();
  let utcHours = date.getUTCHours();
  let hours = addZeroes(date.getUTCHours()) + offset;
  let minutes = addZeroes(date.getUTCMinutes());
  let seconds = addZeroes(date.getUTCSeconds());
  if (hours > 24) {
    hours -= 24;
    hours = addZeroes(hours);
  } else if (hours < 0) {
    hours += 24;
    hours = addZeroes(hours);
  }
  let time = `${hours}:${minutes}:${seconds}`;
  let day = date.getUTCDay();
  let actualDay = "";
  const upcomingDays = [];
  if (offset === 0) {
    time = `${time} GMT`;
  } else if (offset > 0 && offset < 10) {
    time = `${time} GMT+0${offset}:00`;
  } else if (offset > 0 && offset >= 10) {
    time = `${time} GMT+${offset}:00`;
  } else if (offset > 0 && offset < -10) {
    time = `${time} GMT0${offset}:00`;
  } else {
    time = `${time} GMT${offset}:00`;
  }

  if (utcHours + offset > 23) {
    if (day + 1 === 7) {
      actualDay = daysOfWeek[0];
    } else {
      actualDay = daysOfWeek[day + 1];
    }
  }
  if (utcHours + offset < 0) {
    if (day - 1 < 0) {
      actualDay = daysOfWeek[0];
    } else {
      actualDay = daysOfWeek[day - 1];
    }
  } else {
    actualDay = daysOfWeek[day];
  }
  let index = daysOfWeek.indexOf(actualDay);

  for (let i = 1; i <= 7; i += 1) {
    upcomingDays.push(daysOfWeek[index]);
    if (index === 6) {
      index = 0;
    } else {
      index += 1;
    }
  }

  return { time, upcomingDays };
};
export default getTimeAndDay;
