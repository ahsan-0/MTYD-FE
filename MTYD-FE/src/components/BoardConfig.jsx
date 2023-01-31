import produce from "immer";
import { useState, useEffect } from "react";
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
  useEffect(() => {
    setRows(rowInput);
    setCols(colInput);
    setGenerated(false);
  }, [rowInput, colInput]);
  return (
    <>
      <div className="generate">
        <input type="number" placeholder="rows" onChange={handleRowChange}></input>
        <input type="number" placeholder="columns" onChange={handleColChange}></input>
        <button
          onClick={() => {
            setRows(rowInput);
            setCols(colInput);
            setGenerated(true);
            setGrid(generateEmptyGrid());
          }}
        >
          Generate Board
        </button>
      </div>
      {generated ? (
        <div className="board">
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
                  className="cells"
                  key={`${i}-${k}`}
                  onClick={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}
                  style={{
                    backgroundColor: grid[i][k] ? "pink" : undefined,
                  }}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default BoardConfig;
