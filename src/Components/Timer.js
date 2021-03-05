import React from "react";

export const Timer = ({ secs }) => {
  //check if secs > 60, if so, reduce that amount and show as minutes
  let mins = Math.floor(secs / 60);

  let seconds = `${secs - mins * 60 < 10 ? "0" : ""}${secs - mins * 60}`;

  return <label>{`${mins}:${seconds}`}</label>;
};
