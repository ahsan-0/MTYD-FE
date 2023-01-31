import React from "react";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";

export const Logout = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { logout } = useAuth();
  function handelLogOut (){
    logout()
    .then(() => {
      navigate('/login')
    })
    .catch((err) => {
      setError('Faild to log out')
    });
  }
  return (
    <div>
      <button onClick={handelLogOut}>Log out</button>
    </div>
  );
};
