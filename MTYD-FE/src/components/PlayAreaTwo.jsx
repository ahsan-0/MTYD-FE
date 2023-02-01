import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import {
  nextBoard,
  flipRunning,
  flipWrap,
  increaseSpeed,
  decreaseSpeed,
} from "../features/board/boardSlice";
import { useEffect, useContext } from "react";
import { GameControlsContext } from '../contexts/GameControlsContext';
import GameControls from "./GameControls";

function PlayAreaTwo() {
  const { controls } = useContext(GameControlsContext);
  useEffect(() => {
    const { button } = controls;
    if (button === "start") {
      dispatch(flipRunning());
      dispatch(nextBoard());
    } else if (button === "stop") {
      dispatch(flipRunning());
    } else if (button === "faster" && board.interval > 120) {
      dispatch(increaseSpeed());
    } else if (button === "slower") {
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
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const grid = "1fr "
  const gridcolumns = grid.repeat(board.configuration.length)
  function grimReaper(cell) {
    if (cell === 1) {
      return "cellgridliving"
    }
    return "cellgriddead"
  }
  useEffect(() => {
    if (board.running) {
      setTimeout( () => dispatch(nextBoard()), board.interval)
    }
  },[board.configuration]);
  return (
    <>
    <div className="cellboard" style={{ gridTemplateColumns: gridcolumns, }}>
      {board.configuration.map( (row) => {
         return row.map( (cell) => {
            return <div key={uuidv4()} className={grimReaper(cell)}></div>
         }) 
      })}
    </div>
    <GameControls />
    </>
  );
}

export default PlayAreaTwo;
