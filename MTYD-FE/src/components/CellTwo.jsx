import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../features/board/boardSlice";


function CellTwo({ uidv4, alive, location  }) {
  const board = useSelector((state) => state.board) 
  const dispatch = useDispatch()
  const message = "hello i am a pear"

  const greeting = msg => msg;

  function handleClick(args) {
    return () => {
      dispatch(updateBoard(args));
    };
  }


  return (alive === 1 ? <div key={uuidv4()} className={"cellgridliving"} onClick={handleClick(location)}></div> : <div key={uuidv4()} onClick={handleClick(location)} className={"cellgriddead"}></div>  

  );
}
export default CellTwo;