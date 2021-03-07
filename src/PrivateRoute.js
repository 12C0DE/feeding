import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from './Context/GlobalState';

export const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { user } = useContext(GlobalContext);

	return (
		<Route
			{...rest}
			render={(routeProps) =>

					!!user ? <RouteComponent {...routeProps} /> :
					<Redirect to={'/login'} />}
		/>
	);
};
