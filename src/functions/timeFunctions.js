export const getTimeInSecs = time => {
  return time.mins * 60 + time.secs;
};

export const getTimeFromSecs = secs => {
  const minutes = Math.floor(secs / 60);

  const time = {
    mins: minutes,
    secs: secs - minutes * 60
  };

  return time;
};
