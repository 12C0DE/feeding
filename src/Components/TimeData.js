import React from "react";
import { Timer } from "./Timer";
import { Card } from "@material-ui/core";
import "../App.css";
import { cardStyle } from "../Styles/styles";
import EditIcon from "@material-ui/icons/Edit";

export const TimeData = ({ timeData, delTime, modalOpen }) => {
  let timeOfDay = new Date(timeData.timeStmp).toLocaleTimeString();

  return (
    <Card raised={true} style={cardStyle}>
      <div className="delX">
        <button onClick={delTime}>x</button>
      </div>
      <p className="feedTimes">
        {timeOfDay} - Total time of{" "}
        <Timer secs={timeData.left + timeData.right} />
      </p>
      <div className="subDataContainer">
        <p className="subData">
          Left - <Timer secs={timeData.left} />
        </p>
        <p className="subData">
          Right - <Timer secs={timeData.right} />
        </p>
      </div>
      <div className="edit">
        <button onClick={modalOpen}>
          <EditIcon fontSize={"small"} color="disabled" />
        </button>
      </div>
    </Card>
  );
};
