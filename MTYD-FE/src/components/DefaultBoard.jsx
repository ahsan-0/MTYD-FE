import React from "react";
import produce from "immer";

function DefaultBoard({ running, setRunning, grid, setGrid, cols, rows, generateEmptyGrid, runningRef, runSimulation }) {
  return (
    <div>
      <div className="button-container">
        <button
          className={running ? "btn-stop" : "btn-start"}
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "stop" : "start"}
        </button>
        <button
          onClick={() => {
            const arrRows = [];
            for (let i = 0; i < rows; i++) {
              arrRows.push(Array.from(Array(cols), () => (Math.random() > 0.7 ? 1 : 0)));
            }
            setGrid(arrRows);
          }}
        >
          random
        </button>
        <button
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          clear
        </button>
      </div>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 25px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((_col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "pink" : undefined,
                boxShadow: "0px 5px 5px",
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default DefaultBoard;
