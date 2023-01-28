import Table from "./Table";
import Cell from "./Cell";
//import { boardData } from "./board.json";
import { useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const boardString2 = "000110000111011 101110110100111 100011000101111 110011110011111 001001110000111 011101011101111 011011111010111 01100111001011 111011111110111 001111011101111 01110100111111 011010000110111 011111010001011 111011011110111 001010011101111";
const boardString1 = "111111111111111 ".repeat(15);
const boardString = "000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000001111111 000000000000111 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000"
const boardArray = (str => str.split(" ").map(m => m.split("").map(m => +m)))(boardString);


function PlayArea() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameGrid, setGameGrid] = useState(() => boardArray);
  //const [boardConfiguration, setBoardConfiguration] = useState([{coords: [0, 0, 0], alive: 1}]);
 
  const gameRef = useRef(gameIsRunning);
  gameRef.current = gameIsRunning;

  /*useEffect(() => {
    const cellCoords = [];
    for (let i = 0; i < boardArray.length; i++) {
      for (let j = 0; j < boardArray[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: boardArray[i][j] });
      }
    }
    setBoardConfiguration(cellCoords);
  },[]);*/

  function Box() {
    return (
    <mesh 
      onClick={() => {
      setGameIsRunning(!gameIsRunning);
      if (!gameIsRunning) {
        gameRef.current = true;
        runGame();
      };
      }} 
      position={[-4, 2, 0]}>
      <boxGeometry attach="geometry"/>
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
   )
  }

  const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

  const runGame = () => {
    if (!gameRef.current) return;
    const newGameGrid = structuredClone(gameGrid);

    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length ; j++) {
        let liveNeighbours = 0;
        coordOffset.forEach(([x, y]) => {
          /* lines 60-65 define boundary conditions and disallow wrap-around functionality
          if ( i + x >= 0 
            && i + x < gameGrid.length 
            && j + y >= 0 
            && j + y < gameGrid[i].length) {
              liveNeighbours += gameGrid[i + x][j + y];
          }*/

          // lines 68-70 enable cells to wrap around to other side if offset coordinates are -ve
          const xWrapAroundOffset = (i + x + gameGrid[i].length) % gameGrid[i].length;
          const yWrapAroundOffset = (j + y + gameGrid.length) % gameGrid.length;
          liveNeighbours += gameGrid[xWrapAroundOffset][yWrapAroundOffset]
        });
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          newGameGrid[i][j] = 0;
        } else if (gameGrid[i][j] === 0 && liveNeighbours === 3) {
          newGameGrid[i][j] = 1;
        }
      }
    };

    setGameGrid(newGameGrid);
  };

  const boardConfig = gameGrid => {
    const cellCoords = [];
    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: gameGrid[i][j] });
      }
    }
    return cellCoords;
  };

  useEffect(() => {
    setTimeout(runGame, 1000);
  }, [gameGrid]);

  return (
  <>
    <Box/>

    
    {boardConfig(gameGrid).map((cell) => (
    <Cell key={uuidv4()} position={cell.coords} living={cell.alive}/>
    ))}
    <Table size={boardConfig(gameGrid)} />
  </>
  );
}
export default PlayArea;