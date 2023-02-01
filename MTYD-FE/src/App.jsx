import "./App.css";
import React from "react";
import ThreeDimensionalGame from "./components/ThreeDimensionalGame";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";
import Home from "./components/Home";
import UserPatterns from "./components/UserPatterns";
import Board from "./components/Board";
import Patterns from "./components/Patterns";
import Tutorial from "./components/Tutorial";
import PlayAreaTwo from "./components/PlayAreaTwo";

function App() {
  return (
    <div className="App">
    <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/tutorial" element={<Tutorial/>}/>
        <Route path="/3dgame" element={<ThreeDimensionalGame/>}/>
        <Route path="/2dgame" element={<PlayAreaTwo />} />
        <Route path="/user" element={<UserPatterns />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/how-to-play" element={<Tutorial />} />
      </Routes>
    </div>
  );
};
export default App;