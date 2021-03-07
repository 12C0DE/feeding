import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { Timer } from '../Components/Timer';
import { getDateStamp } from '../functions/dateFunctions';
import TimeData from './TimeData';

export const DayView = ({ uid, start, end }) => {
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
	let startDate = getDateStamp(start);
	let endDate = getDateStamp(end);

	useEffect(
		() => {
			db
				.collection('users')
				.doc(uid)
				.collection('times')
				.where('timeStmp', '>=', startDate)
				.where('timeStmp', '<', endDate)
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
			startDate,
			uid
		]
	);

	//   const testData = new Date(times[0].data.timeStmp).toLocaleTimeString();
	return (
		<div className="calendarContainer">
			<h2 className="feedings">
				<strong>
					- {times.length}{' '}
					{
						times.length > 1 ? 'Feedings' :
						'Feeding'}{' '}
					today -
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
			{times.map((time) => {
				return <TimeData key={time.id} timeData={time.data} />;
			})}
		</div>
	);
};
