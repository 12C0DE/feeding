import React from 'react';
import { Timer } from './Timer';
import '../App.css';

function TimeData({ timeData }) {
	// let time2date = new Date(timeData.timeStmp).toLocaleDateString();
	let timeOfDay = new Date(timeData.timeStmp).toLocaleTimeString();

	return (
		<div>
			<p>
				{timeOfDay} - Total time of <Timer secs={timeData.left + timeData.right} />
			</p>
			<p className="subData">
				Left - <Timer secs={timeData.left} />
			</p>
			<p className="subData">
				Right - <Timer secs={timeData.right} />
			</p>
		</div>
	);
}

export default TimeData;
