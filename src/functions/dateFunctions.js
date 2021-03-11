export const getDateStamp = selDate => {
  //accepts a date in the .toLocaleDateString() format

  let startDate = selDate.split("/");
  let newDate = new Date(startDate[2], startDate[0] - 1, startDate[1]);
  let dateTimestamp = newDate.getTime();

  return dateTimestamp;
};

export const dateSplit = selDate => {
  let dateToSplit = selDate.split("/");

  return dateToSplit;
};

export const getTimeLocale = selTime => {
  const timeIn = new Date(selTime).toLocaleTimeString();
  return timeIn;
};

export const splitTimeArr = timeArr => {
  const time = timeArr.split(":");

  return time;
};

export const getTimeStamp = (dateParts, timeParts) => {
  const date = new Date(
    dateParts[2],
    // parseInt(dateParts[1], 10) - 1,
    dateParts[0] - 1,
    dateParts[1],
    timeParts[0],
    timeParts[1]
  );

  const dateTime = date.getTime();

  return dateTime;
};
