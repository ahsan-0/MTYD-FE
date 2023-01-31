import { Edges, Plane } from "@react-three/drei"
import { Physics } from "@react-three/cannon";
import { useState } from "react";

function Cell({ position, living, interact }) {
    const [isAlive, setIsAlive] = useState(living);

    return (
        <mesh onClick={() => {
            if (interact === true) {
              setIsAlive(prev => !prev);
            };
        } } position={position}>
            {isAlive ? <>
            <meshStandardMaterial emissive="hotpink" emissiveIntensity={2} transparent toneMapped={false} opacity={0.9} />
            <Edges color="rgb(200, 60, 200)"/>
            <boxGeometry/></> :
            <><mesh position={[0, -0.5, 0]}>
            <meshStandardMaterial  color="pink" transparent opacity={0.6}/>
            <boxGeometry args={[1, 0.05, 1]}/></mesh></>}
        </mesh>
    );
}
export default Cell;