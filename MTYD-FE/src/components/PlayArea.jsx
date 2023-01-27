import Table from "./Table";
import Cell from "./Cell";
import { boardData } from "./board.json";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

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
  },[]);
  
  return (
  <>
    {boardConfiguration.map((cell) => (
    <Cell key={uuidv4()} position={cell.coords} living={cell.alive} />
    ))}
    {boardConfiguration.length != 0 && <Table size={boardConfiguration} />}
  </>
  );
}
export default PlayArea;
