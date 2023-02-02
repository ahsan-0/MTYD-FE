import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/authComponents/signup";
import { AuthProvider } from "./components/authComponents/AuthProvider";
import Login from "./components/authComponents/Login";
import Showuser from "./components/ShowUser";
import { Logout } from "./components/authComponents/Logout";
import UpdateProfile from "./components/authComponents/Updateprofile";
import ResetPassword from "./components/authComponents/ResetPassword";
import "./App.css";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Showuser />
        <Logout />
        <Routes>
          <Route path="/account" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
