import { useState, useRef, useCallback } from "react"
import produce from "immer"

import { useDispatch, useSelector } from "react-redux";
import { nextBoard, flipRunning, flipWrap, increaseSpeed, decreaseSpeed } from "../features/board/boardSlice";
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

function Board() {
  const board = useSelector(state => state.board);
  const [grid, setGrid] = useState(board.configuration);
  

  return (
    <BoardConfig
      running={running}
      setRunning={setRunning}
      setGrid={setGrid}
    />
  );
}

export default Board

/*
import BoardConfig from "./BoardConfig";
import { useState, useRef, useCallback } from "react"
import produce from "immer"

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

function Board() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [generated, setGenerated] = useState(false);
  const generateEmptyGrid = () => {
    const arrRows = [];
    for (let i = 0; i < rows; i++) {
      arrRows.push(Array.from(Array(cols), () => 0));
    }
    return arrRows;
  };
  const [grid, setGrid] = useState([]);
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;
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
  }, [generated]);
  return (
    <BoardConfig
      running={running}
      setRunning={setRunning}
      setGrid={setGrid}
      grid={grid}
      cols={cols}
      rows={rows}
      generateEmptyGrid={generateEmptyGrid}
      runningRef={runningRef}
      runSimulation={runSimulation}
      setGenerated={setGenerated}
      generated={generated}
      setCols={setCols}
      setRows={setRows}
    />
  );
}

export default Board

*/