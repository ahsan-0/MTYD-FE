import React from "react";
import { Routes, Route } from "react-router-dom";
import Patterns from "./components/Patterns";
import Tutorial from "./components/Tutorial";
import Nav from "./components/Nav";
import UserPatterns from "./components/UserPatterns";
import Board from "./components/Board";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/user" element={<UserPatterns />} />
        <Route path="/automatrix" element={<Board />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/how-to-play" element={<Tutorial />} />
      </Routes>
    </>
  );
};
export default App;
