import Table from "./Table";
import Cell from "./Cell";
//import { boardData } from "./board.json";
import { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

const boardString1 = "000110000111011 101110110100111 100011000101111 110011110011111 001001110000111 011101011101111 011011111010111 01100111001011 111011111110111 001111011101111 01110100111111 011010000110111 011111010001011 111011011110111 001010011101111";

const boardString = "111111111111111 ".repeat(15);

const boardArray = (str => str.split(" ").map(m => m.split("").map(m => +m)))(boardString);

function PlayArea() {
  const [boardConfiguration, setBoardConfiguration] = useState([]);
  const [gameIsRunning, setGameIsRunning] = useState(false);

  const gameRef = useRef(gameIsRunning);
  gameRef.current = gameIsRunning;

  function Box() {
    return (
    <mesh 
      onClick={() => {
      //setGameIsRunning(!gameIsRunning);
      if (!gameIsRunning) {
        gameRef.current = true;
       // runGame();
      };
      }} 
      position={[-4, 2, 0]}>
      <boxGeometry attach="geometry"/>
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
   )
  }

  useEffect(() => {
    const cellCoords = [];
    for (let i = 0; i < boardArray.length; i++) {
      for (let j = 0; j < boardArray[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: boardArray[i][j] });
      }
    }
    setBoardConfiguration(cellCoords);
  },[]);

  const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

  const runGame = useCallback(() => {
    //if (!gameRef.current) return;

    setBoardConfiguration(prev => {
      const board = structuredClone(prev);
      board.map(cell => {
        let surroundingCells = 0;
          coordOffset.forEach(([x, y]) => {
           // const neighbourStatus = 
            surroundingCells
          })

       if (surroundingCells < 2 || surroundingCells > 3) {
         board[row][column] = 0;
       } else if (!prev[row][column] && surroundingCells === 3) {
         board[row][column] = 1;
       }  
      });
      
    })
   // setTimeout(runGame, 200);
  }, []);

  return (
  <>
    <Box/>

    {boardConfiguration.map((cell) => (
    <Cell key={uuidv4()} position={cell.coords} living={cell.alive} runGame={runGame} />
    ))}

    {boardConfiguration.length !== 0 && <Table size={boardConfiguration} />}
  </>
  );
}
export default PlayArea;


/*

const runGame = useCallback(() => {
    if (!gameRef.current) return;

    setBoardConfiguration(prev => {
      const board = structuredClone(prev);
      board.forEach((row, r) => {
        row.forEach((column, c, rowArray) => {
          let surroundingCells = 0;
          comparisonArray.forEach(([x, y]) => {
            const checkState = [
              r + x >= 0, 
              c + y >= 0,
              r + x < board.length,
              c + y < rowArray.length
            ]
            if (checkState.every(m => m)) {
              surroundingCells += prev[r + x][c + y];
            };
          });
          if (surroundingCells < 2 || surroundingCells > 3) {
            board[row][column] = 0;
          } else if (!prev[row][column] && surroundingCells === 3) {
            board[row][column] = 1;
          }
        })
      })
    })
    setTimeout(runGame, 200);
  }, []);
*/