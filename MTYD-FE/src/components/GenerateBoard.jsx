import { useState } from "react";

function GenerateBoard({ setRows, setCols, setGenerated, setGrid, generated, generateEmptyGrid, DefaultBoard }) {
  const [rowInput, setRowInput] = useState(0);
  const [colInput, setColInput] = useState(0);
  const handleRowChange = (event) => {
    setRowInput(parseInt(event.target.value));
  };
  const handleColChange = (event) => {
    setColInput(parseInt(event.target.value));
  };
  return (
    <div>
      <input type="number" placeholder="rows" onChange={handleRowChange}></input>
      <input type="number" placeholder="columns" onChange={handleColChange}></input>
      <button
        onClick={() => {
          setRows(rowInput);
          setCols(colInput);
          setGrid(generateEmptyGrid());
          setGenerated(true);
        }}
      >
        Generate Board
      </button>
    </div>
  );
}

export default GenerateBoard;
