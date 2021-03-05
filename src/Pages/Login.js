import React, { useState } from "react";
import { withRouter } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase/firebase";

const LogIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = e => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(authUser => {
        if (authUser) {
          history.push("/home");
        }
      })
      .catch(error => alert(error.message));
  };

  return (
    <div>
      <h1>Log In</h1>
      <form>
        <h5>E-mail</h5>
        <input
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <h5>Password</h5>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login_signInButton" onClick={signIn} type="submit">
          Sign In
        </button>
      </form>
      <div>
        <h3>
          or <Link to="/signup">sign up</Link> here
        </h3>
      </div>
    </div>
  );
};

export default withRouter(LogIn);
