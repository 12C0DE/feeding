import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { Timer } from '../Components/Timer';
import { getDateStamp } from '../functions/dateFunctions';
import { TimeData } from './TimeData';
import Spinner from '../Components/Spinner';

export const DayView = ({ uid, start, end }) => {
	const [
		times,
		setTimes
	] = useState([]);
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
		isLoading,
		setIsLoading
	] = useState(false);

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

			console.log('useEffect ran');
			// updateTotals();
		},
		[
			end,
			start,
			uid
			// leftTotal,
			// rightTotal,
			// total
			// times
		]
	);

	useEffect(
		() => {
			updateTotals();
		},
		[
			times
		]
	);

	const updateTotals = () => {
		console.log('ran update totals');
		const lefts = times.map((time) => time.data.left).reduce((a, b) => a + b, 0);
		const rights = times.map((time) => time.data.right).reduce((a, b) => a + b, 0);

		setLeftTotal(lefts);
		setRightTotal(rights);

		setTotal(+rights + +lefts);
		console.log(`total time : ${total}`);
	};

	// const delTime = (timeID) => {
	// 	setIsLoading(true);

	// 	db.collection('users').doc(uid).collection('times').doc(timeID).delete().then(() => {
	// 		console.log(`${timeID} deleted`);

	// 		const newTimes = times.filter((time) => time.id !== timeID);

	// 		setTimes(newTimes);
	// 		updateTotals();
	// 		setIsLoading(false);
	// 	});
	// };

	const delTime = useCallback(
		(timeID) => {
			setIsLoading(true);

			db.collection('users').doc(uid).collection('times').doc(timeID).delete().then(() => {
				console.log(`${timeID} deleted`);

				const newTimes = times.filter((time) => time.id !== timeID);

				setTimes(newTimes);
				// updateTotals();
				setIsLoading(false);
			});
		},
		[
			setTimes,
			// updateTotals,
			setIsLoading
		]
	);

	return (
		<div className="calendarContainer">
			<h2 className="feedings">
				<strong>
					- {times.length}{' '}
					{
						times.length === 1 ? 'Feeding' :
						'Feedings'}{' '}
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
				return <TimeData key={time.id} timeData={time.data} delTime={() => delTime()} timeID={time.id} />;
			})}
			{isLoading && <Spinner />}
		</div>
	);
};
