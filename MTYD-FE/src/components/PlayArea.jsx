import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { GameControlsContext } from "../contexts/GameControlsContext";
import { useDispatch, useSelector } from "react-redux";
import {
  nextBoard,
  flipRunning,
  flipWrap,
  increaseSpeed,
  decreaseSpeed,
  increaseBoard,
  decreaseBoard,
  resetBoard,
  randomiseBoard,
  hideTitle,
  clearTable,
  selectSky,
  selectStars
} from "../features/board/boardSlice";
import React from "react";
import CellTwo from "./CellTwo";

function PlayArea() {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [enableInteract, setEnableInteract] = useState(true);
  const { controls } = useContext(GameControlsContext);

  //useEffect(() => {
  //  setBoardConfiguration(board.configuration.length - 1);
  //}, []);

  useEffect(() => {
    const { button } = controls;
    if (button === "start") {
      dispatch(flipRunning());
    } else if (button === "stop") {
      dispatch(flipRunning());
    } else if (button === "incSize") {
      dispatch(increaseBoard());
    } else if (button === "decSize") {
      dispatch(decreaseBoard());
    } else if (button === "faster" && board.interval > 120) {
      dispatch(increaseSpeed());
    } else if (button === "slower") {
      dispatch(decreaseSpeed());
    } else if (button === "reset") {
      dispatch(resetBoard());
      if (board.running) {
        dispatch(flipRunning());
      }
    } else if (button === "randomise") {
      dispatch(randomiseBoard());
    } else if (button === "edge") {
      dispatch(flipWrap());
    } else if (button === "wrap") {
      dispatch(flipWrap());
    } else if (button === "enableClick") {
      setEnableInteract(true);
    } else if (button === "disableClick") {
      setEnableInteract();
    } else if (button === "hide") {
      dispatch(hideTitle());
    } else if (button === "clear") {
      dispatch(clearTable());
    } else if (button === "sky") {
      dispatch(selectSky());
    } else if (button === "stars") {
      dispatch(selectStars());
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
      setTimeout(() => dispatch(nextBoard()), board.interval);
    };
  }, [board.configuration, board.running]);

 /* const newStuff = board.configuration.map((row) => {
    row.map((cell) => {
      return (
        <Cell
          key={uuidv4()}
          position={cell.coords}
          living={cell.alive}
          interact={enableInteract}
        />
      );
    });
  });*/

return (<>
{boardConfig(board.configuration).map(({alive, coords}) => {
  return(<CellTwo key={uuidv4()} location={[coords[0], coords[2]]}
  position={coords}
  alive={alive}
  interact={enableInteract}/>)
})}
</>);
}
export default PlayArea;


 // setGameIsRunning(false);
     // gameRef.current = false;
     // setGameGrid(boardArray);