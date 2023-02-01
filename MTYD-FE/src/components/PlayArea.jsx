import { useState, useRef, useEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
//import PhysicsScene from "./PhysicsScene";
import Cell from "./Cell";
import { GameControlsContext } from "../contexts/GameControlsContext";
import { Physics, useBox } from "@react-three/cannon";
import { useDispatch, useSelector } from "react-redux";
import { nextBoard, flipRunning, flipWrap, increaseSpeed, decreaseSpeed } from "../features/board/boardSlice";
import React from "react";


function PlayArea({setBoardConfiguration}) {

  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const setGameGrid = () => dispatch(nextBoard());
  const [enableInteract, setEnableInteract] = useState(true);
  const { controls } = useContext(GameControlsContext);

//  const [gameIsRunning, setGameIsRunning] = useState(false);
 // const [gameGrid, setGameGrid] = useState(() => boardArray);
 // const [interval, setInterval] = useState(500);
//  const [edgeCondition, setEdgeCondition] = useState('wrap');
//  const [enableInteract, setEnableInteract] = useState(true);

// const { controls } = useContext(GameControlsContext);
// const gameRef = useRef(gameIsRunning);
// gameRef.current = gameIsRunning;

  const [enablePhysics, setEnablePhysics] = useState(false);
  
  useEffect(() => {
    setBoardConfiguration(board.configuration.length - 1);
  }, []);
  
  useEffect(() => {
    const { button } = controls;
    if (button === "start") {
      dispatch(flipRunning());
      dispatch(nextBoard());
    } else if (button === "stop") {
      dispatch(flipRunning());
    } else if (button === "faster" && board.interval > 120) {
      setInterval((prev) => prev - 100);
      dispatch(increaseSpeed());
    } else if (button === "slower") {
      setInterval((prev) => prev + 100);
      dispatch(decreaseSpeed());
    } else if (button === "reset") {
      setGameIsRunning(false);
      dispatch(flipRunning());
      gameRef.current = false;
      setGameGrid(boardArray);
    } else if (button === "edge") {
      dispatch(flipWrap());
    } else if (button === "wrap") {
      dispatch(flipWrap());
    } else if (button === "enableClick") {
      setEnableInteract(true);
    } else if (button === "disableClick") {
      setEnableInteract(false);
    }
  }, [controls]);

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
    return cellCoords;
  };
  useEffect(() => {
    if (board.running) {
      setTimeout( () => dispatch(nextBoard()), board.interval)
    }
    
  },[board.configuration]);
  return boardConfig(board.configuration).map((cell) => {
    return (
      <Cell
        key={uuidv4()}
        position={cell.coords}
        living={cell.alive}
        interact={enableInteract}
      />
    );
  });
}
export default PlayArea;

 /* const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

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

  if (enablePhysics) {
    return <PhysicsScene></PhysicsScene>
  } else {
    return (
      boardConfig(gameGrid).map(cell => {
        return <Cell key={uuidv4()} position={cell.coords} living={cell.alive} interact={enableInteract} physics={enablePhysics}/>
       })
    );
  }
}*/




/*
const {button} = controls;
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
    } else if (button === "enablePhysics") {
      setEnableInteract(false);
      setEnablePhysics(true);
    } else if (button === "disablePhysics") {
      setEnableInteract(true);
      setEnablePhysics(false);
    }
  }, [controls]);
*/