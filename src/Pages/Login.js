import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import Button from '@material-ui/core/Button';
import { saveBtn } from '../Styles/styles';

const LogIn = () => {
	const history = useHistory();
	const [
		email,
		setEmail
	] = useState('');
	const [
		password,
		setPassword
	] = useState('');

	const signIn = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.then((authUser) => {
				if (authUser) {
					history.push('/home');
				}
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="loginContainer">
			<h1>Log In</h1>
			<form>
				<h4>E-mail</h4>
				<input id="txtEmail" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
				<h4>Password</h4>
				<input id="txtpwd" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<div className="center" id="logInDiv">
					<Button variant="contained" style={saveBtn} size="large" type="submit" onClick={signIn}>
						Log In
					</Button>
				</div>
			</form>
			<div>
				<h3 className="center">
					or <Link to="/signup">sign up</Link> here
				</h3>
			</div>
		</div>
	);
};

export default withRouter(LogIn);
