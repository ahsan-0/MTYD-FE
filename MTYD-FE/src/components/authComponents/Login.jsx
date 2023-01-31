import React, { useState } from "react";
import { useAuth } from "../authComponents/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

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
    <>
      <div>
        <form onSubmit={handelSubmit}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <label htmlFor="emailInput">Email</label>
          <input
            id="emailInput"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label id="passwordInput">Password</label>#
          <input
            id="passwordInput"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button type="submit">Log in</button>
        </form>
      </div>
      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
