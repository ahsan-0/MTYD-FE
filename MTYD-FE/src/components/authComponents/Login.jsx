import React, { useState } from "react";
import { useAuth } from "../authComponents/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./Signup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handelSubmit(e) {
    e.preventDefault();
    login(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  }

  return (
    <main className="login_main">
          {error && <p className="login_error">{error}</p>}
        <form onSubmit={handelSubmit}>
          <div className="input-group">
            <label htmlFor="emailInput">Email</label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <label id="passwordInput">Password</label>
            <input
              id="passwordInput"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <button id="login_submit" type="submit">Log in</button>
        </form>
        <p className="login_p">
          Need an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="login_p">
          Forget Password <Link to="/resetpassword ">Reset password </Link>
        </p>
    </main>
  );
}

export default Login;
