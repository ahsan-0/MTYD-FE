import Cell from "./Cell";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const boardString2 = "000110000111011 101110110100111 100011000101111 110011110011111 001001110000111 011101011101111 011011111010111 01100111001011 111011111110111 001111011101111 01110100111111 011010000110111 011111010001011 111011011110111 001010011101111";
const boardString1 = "111111111111111 ".repeat(15);
const boardString = "000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000 000000001111111 000000000000111 000000000000000 000000000000000 000000000000000 000000000000000 000000000000000"
const boardArray = (str => str.split(" ").map(m => m.split("").map(m => +m)))(boardString);


function PlayArea({setBoardConfiguration, controls}) {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [gameGrid, setGameGrid] = useState(() => boardArray);
  const [interval, setInterval] = useState(500);
  const [edgeCondition, setEdgeCondition] = useState('wrap');
  const [enableInteract, setEnableInteract] = useState(true);

  const gameRef = useRef(gameIsRunning);
  gameRef.current = gameIsRunning;
  
  useEffect(() => {
    setBoardConfiguration(gameGrid.length - 1);
  }, []);
  
  useEffect(() => {
  const {button} = controls;
  console.log(button);
    if (button === "start") {
      setGameIsRunning(true);
      gameRef.current = true;
      runGame();
    } else if (button === "stop") {
      setGameIsRunning(false);
      gameRef.current = false;
    } else if (button === "faster" && interval > 120) {
      setInterval(prev => prev - 100);
    } else if (button === "slower") {
      setInterval(prev => prev + 100);
    } else if (button === "reset") {
      setGameIsRunning(false);
      gameRef.current = false;
      setGameGrid(boardArray);
    } else if (button === "edge") {
      setEdgeCondition("edge");
    } else if (button === "wrap") {
      setEdgeCondition("wrap");
    } else if (button === "enableClick") {
      setEnableInteract(true);
    } else if (button === "disableClick") {
      setEnableInteract(false);
    }
  }, [controls]);


  const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

  const runGame = () => {
    if (!gameRef.current) return;
    const newGameGrid = structuredClone(gameGrid);

    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length ; j++) {
        let liveNeighbours = 0;
        coordOffset.forEach(([x, y]) => {
          if (edgeCondition === "edge") {
             if ( i + x >= 0 
             && i + x < gameGrid.length 
             && j + y >= 0 
             && j + y < gameGrid[i].length) {
               liveNeighbours += gameGrid[i + x][j + y];
             }
          } else if (edgeCondition === "wrap") {
          const xWrapAroundOffset = (i + x + gameGrid[i].length) % gameGrid[i].length;
          const yWrapAroundOffset = (j + y + gameGrid.length) % gameGrid.length;
          liveNeighbours += gameGrid[xWrapAroundOffset][yWrapAroundOffset];
          };
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
    setTimeout(runGame, interval);
  }, [gameGrid]);

  return (
  <>
    {boardConfig(gameGrid).map(cell => (
    <Cell key={uuidv4()} position={cell.coords} living={cell.alive} interact={enableInteract}/>
    ))}
  </>
  );
}
export default PlayArea;

