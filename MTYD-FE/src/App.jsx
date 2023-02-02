import "./App.css";
import React from "react";
import ThreeDimensionalGame from "./components/ThreeDimensionalGame";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";
import Home from "./components/Home";
import UserPatterns from "./components/UserPatterns";
import Patterns from "./components/Patterns";
import Tutorial from "./components/Tutorial";
import PlayAreaTwo from "./components/PlayAreaTwo";
import { AuthProvider } from "./components/authComponents/AuthProvider";
import Login from "./components/authComponents/Login";
import Signup from "./components/authComponents/signup";
import UpdateProfile from "./components/authComponents/Updateprofile";
import ResetPassword from "./components/authComponents/ResetPassword";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/3dgame" element={<ThreeDimensionalGame />} />
          <Route path="/2dgame" element={<PlayAreaTwo />} />
          <Route path="/user" element={<UserPatterns />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/how-to-play" element={<Tutorial />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
