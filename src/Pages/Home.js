import React, { useContext, useEffect, useState } from "react";
import { Timer } from "../Components/Timer";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { db } from "../firebase/firebase";
import boob from "../img/boob.svg";
import boobDrip from "../img/boob_drip.svg";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { saveBtn, clearBtn } from "../Styles/styles";

function Home() {
  const history = useHistory();
  const [recTime, setRecTime] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [disabledSide, setDisabledSide] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [time, setTime] = useState(0);
  const { leftTime, rightTime, setLeftTime, setRightTime, user } = useContext(
    GlobalContext
  );

  const displayBoob = side => {
    if (recTime && disabledSide !== side) {
      return (
        <img className="boobDrip" src={boobDrip} alt={`boobDrip_${side}`} />
      );
    } else {
      return <img className="boob" src={boob} alt={`boob_${side}`} />;
    }
  };

  const feedTime = side => {
    if (!recTime) {
      setRecTime(true);
      setStartTime(Date.now());

      if (side === "L") {
        setDisabledSide("R");
      } else {
        setDisabledSide("L");
      }
    } else {
      side === "L"
        ? setLeftTime(leftTime + time)
        : setRightTime(rightTime + time);

      setTime(0);
      setRecTime(false);
    }
  };

  const clearTimes = () => {
    setLeftTime(0);
    setRightTime(0);
    setTime(0);
    setRecTime(false);
  };

  const saveTime = () => {
    if (leftTime > 0 || rightTime > 0) {
      const timeRec = {
        left: leftTime,
        right: rightTime,
        timeStmp: Date.now()
      };

      clearTimes();

      db.collection("users")
        .doc(user.uid)
        .collection("times")
        .add({
          left: timeRec.left,
          right: timeRec.right,
          timeStmp: timeRec.timeStmp
        })
        .then(() => {
          setShowStatus(true);
          setTimeout(function() {
            setShowStatus(false);
          }, 3000);
        });
    }
  };

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  useEffect(() => {
    if (recTime) {
      if (time > 3600) {
        setRecTime(false);
        return;
      }
      const timer = setTimeout(() => {
        let timeDiff = Date.now() - startTime;
        setTime(Math.floor(timeDiff / 1000));
      }, [1000]);
      // Clear timeout if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [time, recTime]);

  return (
    <div className="homeDiv">
      <div className="timerContainer">
        <div className="leftTimer">
          <h2>
            Left - <Timer secs={leftTime} />
          </h2>
        </div>
        <div className="rightTimer">
          <h2>
            Right - <Timer secs={rightTime} />
          </h2>
        </div>
      </div>
      <div className="boobContainer">
        <button
          className="btnBoob"
          disabled={recTime && disabledSide === "L"}
          onClick={() => feedTime("L")}
        >
          {displayBoob("L")}
        </button>
        <button
          className="btnBoob"
          disabled={recTime && disabledSide === "R"}
          onClick={() => feedTime("R")}
        >
          {displayBoob("R")}
        </button>
      </div>
      <div className="timer">
        <h1>
          <Timer secs={time} />
        </h1>
      </div>
      <div className="statusContainer">
        {showStatus ? <p>Time Saved!</p> : null}
      </div>
      <div className="btnContainer">
        <Button
          variant="contained"
          color="secondary"
          size="large"
          style={clearBtn}
          onClick={() => clearTimes()}
        >
          Clear
        </Button>
        <Button
          variant="contained"
          style={saveBtn}
          size="large"
          startIcon={<SaveIcon />}
          disabled={recTime}
          onClick={() => saveTime()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Home;
