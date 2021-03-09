import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

//inital state
const initialState = {
	leftTime  : 0,
	rightTime : 0,
	user      : null
};

//create context
export const GlobalContext = createContext(initialState);

//provider component
export const GlobalProvider = ({ children }) => {
	const [
		state,
		dispatch
	] = useReducer(AppReducer, initialState);

	//actions

	function setLeftTime(time) {
		dispatch({
			type    : 'SET_LEFT',
			payload : time
		});
	}
	function setRightTime(time) {
		dispatch({
			type    : 'SET_RIGHT',
			payload : time
		});
	}
	function setUser(user) {
		dispatch({
			type    : 'SET_USER',
			payload : user
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				leftTime     : state.leftTime,
				rightTime    : state.rightTime,
				user         : state.user,
				setLeftTime,
				setRightTime,
				setUser
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
