import React from 'react';
import { Timer } from './Timer';
import { Card } from '@material-ui/core';
import '../App.css';
import { cardStyle } from '../Styles/styles';

function TimeData({ timeData }) {
	// let time2date = new Date(timeData.timeStmp).toLocaleDateString();
	let timeOfDay = new Date(timeData.timeStmp).toLocaleTimeString();

	return (
		<Card raised={true} style={cardStyle}>
			<p className="feedTimes">
				{timeOfDay} - Total time of <Timer secs={timeData.left + timeData.right} />
			</p>
			<div className="subDataContainer">
				<p className="subData">
					Left - <Timer secs={timeData.left} />
				</p>
				<p className="subData">
					Right - <Timer secs={timeData.right} />
				</p>
			</div>
		</Card>
	);
}

export default TimeData;
