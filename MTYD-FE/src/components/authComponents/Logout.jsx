import React from "react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { currentUser } = useAuth();
  function handelLogOut() {
    logout()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError("Faild to log out");
      });
  }

  return (
    <div>
      <button onClick={handelLogOut} className="logout-btn">
        Log out
      </button>
    </div>
  );
};

export default Logout;
