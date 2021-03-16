import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { getTimeFromSecs, getTimeInSecs } from '../functions/timeFunctions';
import { getTimeLocale, splitTimeArr, dateSplit, getTimeStamp } from '../functions/dateFunctions';
import Button from '@material-ui/core/Button';

export const ModalData = ({ modData, startDate, uid, timeId, close }) => {
	const [
		totalLeftSecs,
		setTotalLeftSecs
	] = useState(modData.left);
	const [
		totalRightSecs,
		setTotalRightSecs
	] = useState(modData.right);

	const [
		time,
		setTime
	] = useState(modData.timeStmp);

	const timeStr = getTimeLocale(modData.timeStmp);
	const timeSplit = splitTimeArr(timeStr);

	const dateArr = dateSplit(startDate);

	const [
		isAM,
		setIsAM
	] = useState(false);
	const [
		hours,
		setHours
	] = useState(+timeSplit[0]);
	const [
		mins,
		setMins
	] = useState(+timeSplit[1]);

	let leftTime = getTimeFromSecs(modData.left);
	let rightTime = getTimeFromSecs(modData.right);

	const [
		rightSecs,
		setRightSecs
	] = useState(rightTime.secs);
	const [
		rightMins,
		setRightMins
	] = useState(rightTime.mins);

	const [
		leftSecs,
		setLeftSecs
	] = useState(leftTime.secs);
	const [
		leftMins,
		setLeftMins
	] = useState(leftTime.mins);

	useEffect(() => {
		const am = timeSplit[2].indexOf('AM');


			am >= 0 ? setIsAM(true) :
			setIsAM(false);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (leftMins < 0 || rightMins < 0 || leftSecs < 0 || leftSecs > 59 || rightSecs < 0 || rightSecs > 59) {
			return;
		}

		//update TIME
		let addHrs =
			isAM ? 0 :
			12;
		let newHrs = 0;

		if (hours === 12) {
			if (isAM) {
				newHrs = 0;
			} else {
				newHrs = 12;
			}
		} else {
			newHrs = hours + addHrs;
		}

		timeSplit[0] = newHrs;
		timeSplit[1] = mins;
		timeSplit[2] = '00';

		const newTime = getTimeStamp(dateArr, timeSplit);
		setTime(newTime);

		//update LEFT
		leftTime.mins = leftMins;
		leftTime.secs = leftSecs;

		const updatedLeft = getTimeInSecs(leftTime);
		setTotalLeftSecs(updatedLeft);

		//update RIGHT
		rightTime.mins = rightMins;
		rightTime.secs = rightSecs;
		const updatedRight = getTimeInSecs(rightTime);

		setTotalRightSecs(updatedRight);

		db.collection('users').doc(uid).collection('times').doc(timeId).set({
			left     : updatedLeft,
			right    : updatedRight,
			timeStmp : newTime
		});
		close();
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Time</h2>
			<div className="modalDiv">
				<div className="timeDiv">
					<div className="timeInputDiv">
						<input
							type="number"
							name="hrs"
							className="timeInput"
							min="1"
							max="12"
							step="1"
							defaultValue={hours}
							onChange={(e) => setHours(+e.target.value)}
						/>
					</div>
					<div className="timeInputDiv">
						<input
							type="number"
							name="mins"
							className="timeInput"
							min="0"
							max="59"
							step="1"
							defaultValue={mins}
							onChange={(e) => setMins(+e.target.value)}
						/>
					</div>
					<div className="amPm">
						<div>
							<input type="checkbox" checked={isAM} onChange={() => setIsAM(!isAM)} />
							<span>A.M</span>
						</div>
						<div>
							<input type="checkbox" checked={!isAM} onChange={() => setIsAM(!isAM)} />
							<span>P.M</span>
						</div>
					</div>
				</div>
				<h3>Left</h3>
				<div className="timeDiv margRight">
					<div className="timeInputDiv">
						<input
							type="number"
							id="leftMinutes"
							className="timeInput"
							min="0"
							step="1"
							defaultValue={leftTime.mins}
							onChange={(e) => setLeftMins(+e.target.value)}
						/>
					</div>
					<div className="timeInputDiv">
						<input
							type="number"
							id="leftSeconds"
							className="timeInput"
							min="0"
							max="59"
							step="1"
							defaultValue={leftTime.secs}
							onChange={(e) => setLeftSecs(+e.target.value)}
						/>
					</div>
					<div className="" />
				</div>
				<h3>Right</h3>
				<div className="timeDiv margRight">
					<div className="timeInputDiv">
						<input
							type="number"
							id="rightMinutes"
							className="timeInput"
							min="0"
							step="1"
							defaultValue={rightTime.mins}
							onChange={(e) => setRightMins(+e.target.value)}
						/>
					</div>
					<div className="timeInputDiv">
						<input
							type="number"
							id="rightSeconds"
							className="timeInput"
							min="0"
							max="59"
							step="1"
							defaultValue={rightTime.secs}
							onChange={(e) => setRightSecs(+e.target.value)}
						/>
					</div>
					<div />
				</div>
				<div className="updateDiv">
					<Button variant="contained" color="secondary" size="small" onClick={(e) => handleSubmit(e)}>
						Update Time
					</Button>
				</div>
			</div>
		</form>
	);
};
