import React, { useCallback, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { Timer } from "../Components/Timer";
import { getDateStamp } from "../functions/dateFunctions";
import { TimeData } from "./TimeData";
import Spinner from "../Components/Spinner";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { modalCardStyle } from "../Styles/styles";
import { Card } from "@material-ui/core";
import { ModalData } from "../Components/ModalData";

export const DayView = ({ uid, start, end }) => {
  const [times, setTimes] = useState([]);
  const [leftTotal, setLeftTotal] = useState(0);
  const [rightTotal, setRightTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [modData, setModData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [passedId, setPassedId] = useState("");

  let startDate = getDateStamp(start);
  let endDate = getDateStamp(end);

  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .collection("times")
      .where("timeStmp", ">=", startDate)
      .where("timeStmp", "<", endDate)
      .orderBy("timeStmp", "desc")
      .onSnapshot(snap => {
        setTimes(
          snap.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }))
        );
      });
  }, [end, start, uid]);

  useEffect(() => {
    updateTotals();
  }, [times]);

  const updateTotals = () => {
    const lefts = times.map(time => time.data.left).reduce((a, b) => a + b, 0);
    const rights = times
      .map(time => time.data.right)
      .reduce((a, b) => a + b, 0);

    setLeftTotal(lefts);
    setRightTotal(rights);

    setTotal(+rights + +lefts);
  };

  const delTime = timeID => {
    setIsLoading(true);

    db.collection("users")
      .doc(uid)
      .collection("times")
      .doc(timeID)
      .delete()
      .then(() => {
        const newTimes = times.filter(time => time.id !== timeID);

        setTimes(newTimes);
        setIsLoading(false);
      });
  };

  const handleOpenMod = (mData, timeId) => {
    setOpen(true);
    setModData(mData);
    setPassedId(timeId);
  };

  return (
    <React.Fragment>
      <div className="calendarContainer">
        <h2 className="feedings">
          <strong>
            - {times.length} {times.length === 1 ? "Feeding" : "Feedings"} today
            -
          </strong>
        </h2>
        <h2 className="calendarHeadings">Totals for Today</h2>
        <div className="totals">
          <h3 className="timeRow">
            Left - <Timer secs={leftTotal} />
          </h3>
          <h3 className="timeRow">
            Right - <Timer secs={rightTotal} />
          </h3>
          <h3 className="timeRow">
            Total - <Timer secs={total} />
          </h3>
        </div>
        <h2 className="calendarHeadings">Feedings</h2>
        {times.map(time => {
          return (
            <TimeData
              key={time.id}
              timeData={time.data}
              delTime={() => delTime(time.id)}
              timeID={time.id}
              modalOpen={() => handleOpenMod(time.data, time.id)}
            />
          );
        })}
        {isLoading && <Spinner />}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Card raised={false} style={modalCardStyle}>
          <ModalData
            modData={modData}
            startDate={start}
            uid={uid}
            timeId={passedId}
            close={() => setOpen(false)}
          />
        </Card>
      </Modal>
    </React.Fragment>
  );
};
