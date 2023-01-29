//import { Bloom, EffectComposer } from "@react-three/postprocessing";
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
            <Physics>
            {isAlive ? <>
            <meshStandardMaterial emissive="hotpink" emissiveIntensity={2} transparent toneMapped={false} opacity={0.9} />
            <Edges color="rgb(200, 60, 200)"/>
            <boxGeometry/></> :
            <><mesh position={[0, -0.5, 0]}>
            <meshStandardMaterial  color="pink" transparent opacity={0.6}/>
            <boxGeometry args={[1, 0.05, 1]}/></mesh></>}
            </Physics>
        </mesh>
    );
}
export default Cell;


//add click handler to cell component
//must be defined in parent component and passed down as prop without being called
//git push origin threelayer

//not working - <Bloom mipmapBlur luminanceThreshold={1} mipmapBlur />