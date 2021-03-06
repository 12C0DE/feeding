import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Header({ NotIn }) {
	return (
		<div className="header_Container">
			{!NotIn && (
				<div className="header_Content">
					<Link to="/home">
						<h3>Main</h3>
					</Link>
				</div>
			)}
			<div className="header_Title">
				<h1>Feeding</h1>
			</div>
			{!NotIn && (
				<div className="header_Content">
					<Link to="/calendar">
						<h3>Calendar</h3>
					</Link>
				</div>
			)}
		</div>
	);
}

export default Header;
