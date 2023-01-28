import { Bloom } from "@react-three/postprocessing";
import { Edges } from "@react-three/drei"

function Cell({ position, living }) {
    return (
        <mesh onClick={() => console.log(position)} position={position}>
            { living === 1 ?
            <><meshStandardMaterial emissive="hotpink" emissiveIntensity={2} transparent toneMapped={false} opacity={0.9} />
             <Edges color="rgb(200, 60, 200)"></Edges>
            </>
            : <meshStandardMaterial transparent opacity={0.1} />}
            <boxGeometry />
        </mesh>
    );
}
export default Cell;


//add click handler to cell component
//must be defined in parent component and passed down as prop without being called
//git push origin threelayer
//not working
//<Bloom mipmapBlur luminanceThreshold={1} mipmapBlur />