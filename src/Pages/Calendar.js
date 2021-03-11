import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { DayView } from "../Components/DayView";
import TimeSelect from "../Components/TimeSelect";

function Calendar() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());

  const eDate = new Date(startDate);
  eDate.setDate(eDate.getDate() + 1);

  const [endDate, setEndDate] = useState(eDate.toLocaleDateString());
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  const subDate = () => {
    const currDate = new Date(startDate);

    currDate.setDate(currDate.getDate() - 1);
    setStartDate(currDate.toLocaleDateString());
    setEndDate(startDate);
  };

  const addDate = () => {
    const currDate = new Date(endDate);

    if (currDate.getTime() > new Date().getTime()) {
      return;
    }

    currDate.setDate(currDate.getDate() + 1);
    setStartDate(endDate);
    setEndDate(currDate.toLocaleDateString());
  };

  return (
    <div>
      <TimeSelect addDay={() => addDate()} subDay={() => subDate()} />
      <h3 id="currDate">{startDate}</h3>
      <DayView uid={user.uid} start={startDate} end={endDate} />
    </div>
  );
}

export default Calendar;
