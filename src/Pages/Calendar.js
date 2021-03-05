import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';
import { DayView } from '../Components/DayView';
// import TimeSelect from "../Components/TimeSelect";

function Calendar() {
	const history = useHistory();
	const { user } = useContext(GlobalContext);
	let today = new Date().toLocaleDateString();

	useEffect(
		() => {
			if (!user) {
				history.push('/login');
			}
		},
		[
			history,
			user
		]
	);

	return (
		<div>
			{/* <TimeSelect /> */}
			<DayView uid={user.uid} selDate={today} />
		</div>
	);
}

export default Calendar;
