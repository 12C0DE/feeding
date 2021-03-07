import React from 'react';

function TimeSelect({ addDay, subDay }) {
	return (
		<div className="timeSelectContainer">
			<div>
				<h2 className="btnPrevNext" onClick={subDay}>
					{'<'}
				</h2>
			</div>
			<div>
				<h6>Day</h6>
			</div>
			<div>
				<h6>Week</h6>
			</div>
			<div>
				<h6>Month</h6>
			</div>
			<div>
				<h2 className="btnPrevNext" onClick={addDay}>
					{'>'}
				</h2>
			</div>
		</div>
	);
}

export default TimeSelect;
