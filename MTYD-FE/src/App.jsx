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

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/3dgame" element={<ThreeDimensionalGame/>}/>
        <Route path="/user" element={<UserPatterns />} />
        <Route path="/automatrix" element={<Board />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/how-to-play" element={<Tutorial />} />
      </Routes>
    </div>
  );
};
export default App;


//  <Navigation/>