import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { updateBoard } from "../features/board/boardSlice";
import { useLocation } from 'react-router-dom';
import { Edges } from "@react-three/drei";

function CellTwo({ alive, location, position }) {
  //const board = useSelector((state) => state.board) ;
  const dispatch = useDispatch();
  const url = useLocation();
  
  function handleClick(args) {
    return () => {
      dispatch(updateBoard(args));
    };
  };

  if (url.pathname[1] === "3") {
  return(<mesh onClick={handleClick(location)} position={position}>
    {alive ? <>
    <meshStandardMaterial emissive="hotpink" emissiveIntensity={2} transparent toneMapped={false} opacity={0.9} />
    <Edges color="rgb(200, 60, 200)"/>
    <boxGeometry/></> :
    <><mesh position={[0, -0.5, 0]}>
    <meshStandardMaterial  color="pink" transparent opacity={0.6}/>
    <boxGeometry args={[1, 0.05, 1]}/></mesh></>}
  </mesh>);
  } else {
    return (<div key={uuidv4()} className={alive === 1 ? "cellgridliving" : "cellgriddead"} onClick={handleClick(location)}/>)
  }
}

export default CellTwo;


/*
if (alive === 1) {
      return (<div key={uuidv4()} className={"cellgridliving"} onClick={handleClick(location)}></div>)
    } else {
      return (<div key={uuidv4()} onClick={handleClick(location)} className={"cellgriddead"}></div>)
    };

*/