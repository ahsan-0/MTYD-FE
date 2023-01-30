import React, { useState, useCallback, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import produce from "immer";
import GenerateBoard from "./components/GenerateBoard";
import Patterns from "./components/Patterns";
import Tutorial from "./components/Tutorial";
import Nav from "./components/Nav";
import DefaultBoard from "./components/DefaultBoard";
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
const App = () => {
  const [running, setRunning] = useState(false);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [generated, setGenerated] = useState(false);
  const [grid, setGrid] = useState([]);
  const runningRef = useRef(running);
  runningRef.current = running;
  const generateEmptyGrid = () => {
    const arrRows = [];
    for (let i = 0; i < rows; i++) {
      arrRows.push(Array.from(Array(cols), () => {}));
    }
    return arrRows;
  };
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < rows; i++) {
          for (let k = 0; k < cols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < rows && newK >= 0 && newK < cols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    setTimeout(runSimulation, 300);
  }, []);
  return (
    <>
      {console.log("working?")}
      <Nav />
      <Routes>
        <Route
          path="/automatrix"
          element={
            <GenerateBoard
              setCols={setCols}
              setRows={setRows}
              setGenerated={setGenerated}
              generated={generated}
              generateEmptyGrid={generateEmptyGrid}
              setGrid={setGrid}
            />
          }
        />
        <Route
          path="/patterns"
          element={
            <Patterns
              running={running}
              setRunning={setRunning}
              setGrid={setGrid}
              grid={grid}
              cols={cols}
              rows={rows}
              runningRef={runningRef}
              runSimulation={runSimulation}
            />
          }
        />
        <Route path="/how-to-play" element={<Tutorial />} />
      </Routes>
      <DefaultBoard
        running={running}
        setRunning={setRunning}
        setGrid={setGrid}
        grid={grid}
        cols={cols}
        rows={rows}
        generateEmptyGrid={generateEmptyGrid}
        runningRef={runningRef}
        runSimulation={runSimulation}
      />
    </>
  );
};
export default App;
