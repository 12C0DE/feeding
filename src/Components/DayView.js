import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { Timer } from '../Components/Timer';
import TimeData from './TimeData';

export const DayView = ({ uid, selDate }) => {
	const [
		leftTotal,
		setLeftTotal
	] = useState(0);
	const [
		rightTotal,
		setRightTotal
	] = useState(0);
	const [
		total,
		setTotal
	] = useState(0);
	const [
		times,
		setTimes
	] = useState([]);
	let myDate = selDate.split('/');
	let newDate = new Date(myDate[2], myDate[0] - 1, myDate[1]);
	let dateTimestamp = newDate.getTime();
	// let time2date = new Date(dateTimestamp).toLocaleDateString();
	// let timeOfDay = new Date(dateTimestamp).toLocaleTimeString();

	useEffect(
		() => {
			db
				.collection('users')
				.doc(uid)
				.collection('times')
				.where('timeStmp', '>=', dateTimestamp)
				.orderBy('timeStmp', 'desc')
				.onSnapshot((snap) => {
					setTimes(
						snap.docs.map((doc) => ({
							id   : doc.id,
							data : doc.data()
						}))
					);
				});

			setLeftTotal(times.map((time) => time.data.left).reduce((a, b) => a + b, 0));
			setRightTotal(times.map((time) => time.data.right).reduce((a, b) => a + b, 0));
			setTotal(rightTotal + leftTotal);
		},
		[
			times,
			leftTotal,
			rightTotal,
			dateTimestamp,
			uid
		]
	);

	//   const testData = new Date(times[0].data.timeStmp).toLocaleTimeString();
	return (
		<div className="calendarContainer">
			<h2>
				<strong>
					<u>{times.length} feedings today</u>
				</strong>
			</h2>
			<h2 className="calendarHeadings">Totals for Today</h2>
			<h3>
				Left - <Timer secs={leftTotal} />
			</h3>
			<h3>
				Right - <Timer secs={rightTotal} />
			</h3>
			<h4>
				In TOTAL - <Timer secs={total} />
			</h4>
			<h2 className="calendarHeadings">Feedings</h2>
			{times.map((time) => {
				return <TimeData key={time.id} timeData={time.data} />;
			})}
		</div>
	);
};
