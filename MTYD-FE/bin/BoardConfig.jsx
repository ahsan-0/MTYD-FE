import produce from "immer";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';
function BoardConfig({
  running,
  setRunning,
  grid,
  setGrid,
  cols,
  rows,
  generateEmptyGrid,
  runningRef,
  runSimulation,
  generated,
  setRows,
  setCols,
  setGenerated,
}) {
  const [rowInput, setRowInput] = useState(0);
  const [colInput, setColInput] = useState(0);
  const handleRowChange = (event) => {
    setRowInput(parseInt(event.target.value));
  };
  const handleColChange = (event) => {
    setColInput(parseInt(event.target.value));
  };

  const board = useSelector(state => state.board);


  useEffect(() => {
    setRows(rowInput);
    setCols(colInput);
    setGenerated(false);
  }, [rowInput, colInput]);
  
  
  const boardConfig = (gameGrid) => {
    const cellCoords = [];
    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        cellCoords.push({
          coords: [i, 0, j],
          alive: board.configuration[i][j],
        });
      }
    }
  
    return (
    <><div className="generate">
        <input type="number" placeholder="rows" onChange={handleRowChange}></input>
        <input type="number" placeholder="columns" onChange={handleColChange}></input>
        <button
          onClick={() => {
            setRows(rowInput);
            setCols(colInput);
            setGenerated(true);
            setGrid(board);
          }}
        >
          Generate Board
        </button>
      </div>
        <div className="board">
          <div className="button-container"> 
            <button
              className={ board.running ? "btn-stop" : "btn-start"}
              onClick={() => {
                dispatch(flipRunning());
                if (!board.running) {
                  dispatch(flipRunning())
                          }
              }}
            >
              {board.running ? "stop" : "start"}
            </button>
          </div>
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 25px)`,
            }}
          >
    {boardConfig(board.configuration).map((cell) => {
    return (
      <div
        key={uuidv4()}
        position={cell.coords}
        living={cell.alive}
        interact={enableInteract}></div>)})}</div>
        </div></>);
}
}
export default BoardConfig;
