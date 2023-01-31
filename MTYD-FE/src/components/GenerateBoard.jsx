import { useState, useEffect } from "react";

function GenerateBoard({ setRows, setCols, setGenerated, setGrid, generateEmptyGrid }) {
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
  );
}

export default GenerateBoard;
