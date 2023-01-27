import Table from "./Table";
import Cell from "./Cell";
import { boardData } from "./board.json";
import { useState, useEffect } from "react";

function PlayArea() {
    
  const [boardConfiguration, setBoardConfiguration] = useState([]);

    useEffect( () => {
  const cellCoords = [];
  for (let i = 0; i < boardData.length; i++) {
    for (let j = 0; j < boardData[i].length; j++) {
      cellCoords.push({ coords: [i, 0, j], alive: boardData[i][j] });
    }
  }
  setBoardConfiguration(cellCoords);
},[])
  return (
    <>
  {boardConfiguration.map((cell) => (
    <Cell position={cell.coords} living={cell.alive} />
  ))}
      <Table size={boardConfiguration} />
    </>
  );
}
export default PlayArea;
