import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GlobalContext } from './Context/GlobalState';
import NotFound from './Pages/NotFound';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Header from './Components/Header';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { auth } from './firebase/firebase';
import './App.css';

function App() {
	const { setUser } = useContext(GlobalContext);

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//the user just logged in OR the user was logged in
				setUser(authUser);
			} else {
				//the user is logged out
				setUser(null);
			}
		});
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/home">
						<Header />
						<Home />
					</Route>
					<Route exact path="/login">
						<Header NotIn />
						<Login />
					</Route>
					<Route exact path="/signup">
						<Header NotIn />
						<Signup />
					</Route>
					<Route exact path="/calendar">
						<Header />
						<Calendar />
					</Route>
					<Route path="/404">
						<NotFound />
					</Route>
					<Redirect to="/login" />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
