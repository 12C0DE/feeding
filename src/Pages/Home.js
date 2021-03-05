import React, { useContext, useEffect, useState } from 'react';
import { Timer } from '../Components/Timer';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';
import { db } from '../firebase/firebase';
import boob from '../img/boob.svg';
import boobDrip from '../img/boob_drip.svg';

function Home() {
	const history = useHistory();
	const [
		leftTime,
		setLeftTime
	] = useState(0);
	const [
		rightTime,
		setRightTime
	] = useState(0);
	const [
		recTime,
		setRecTime
	] = useState(false);
	const [
		disabledSide,
		setDisabledSide
	] = useState('');
	const [
		showStatus,
		setShowStatus
	] = useState(false);
	const [
		time,
		setTime
	] = useState(0);
	const { user } = useContext(GlobalContext);

	const displayBoob = (side) => {
		if (recTime && disabledSide !== side) {
			return <img className="boobDrip" src={boobDrip} alt={`boobDrip_${side}`} />;
		} else {
			return <img className="boob" src={boob} alt={`boob_${side}`} />;
		}
	};

	const feedTime = (side) => {
		if (!recTime) {
			setRecTime(true);

			if (side === 'L') {
				setDisabledSide('R');
			} else {
				setDisabledSide('L');
			}
		} else {

				side === 'L' ? setLeftTime(leftTime + time) :
				setRightTime(rightTime + time);

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
				left     : leftTime,
				right    : rightTime,
				timeStmp : Date.now()
			};

			clearTimes();

			db
				.collection('users')
				.doc(user.uid)
				.collection('times')
				.add({
					left     : timeRec.left,
					right    : timeRec.right,
					timeStmp : timeRec.timeStmp
				})
				.then(() => {
					setShowStatus(true);
					setTimeout(function() {
						setShowStatus(false);
					}, 3000);
				});
		}
	};

	useEffect(
		() => {
			if (!user) {
				history.push('/login');
			}
		},
		[
			user
		]
	);

	useEffect(
		() => {
			if (recTime) {
				const timer = setTimeout(
					() => {
						setTime(time + 1);
					},
					[
						1000
					]
				);
				// Clear timeout if the component is unmounted
				return () => clearTimeout(timer);
			}
		},
		[
			time,
			recTime
		]
	);

	return (
		<div>
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
				<button className="btnBoob" disabled={recTime && disabledSide === 'L'} onClick={() => feedTime('L')}>
					{displayBoob('L')}
				</button>
				<button className="btnBoob" disabled={recTime && disabledSide === 'R'} onClick={() => feedTime('R')}>
					{displayBoob('R')}
				</button>
			</div>
			<div className="timer">
				<h1>
					<Timer secs={time} />
				</h1>
			</div>
			<div className="statusContainer">
				{
					showStatus ? <p>Time Saved!</p> :
					null}
			</div>
			<div className="btnContainer">
				<button className="clear" onClick={() => clearTimes()}>
					Clear
				</button>
				<button className="save" disabled={recTime} onClick={() => saveTime()}>
					Save
				</button>
			</div>
		</div>
	);
}

export default Home;
