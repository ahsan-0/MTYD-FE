import img from "./green.png";
import * as THREE from "three";

function Table({ size }) {
  const texture = new THREE.TextureLoader().load(img);
  const boxLength = size[size.length - 1].coords[0]
  return (
    <>
      <mesh
        position={[boxLength / 2, -1, boxLength / 2,
        ]}
      >
        <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}
        />
        <boxGeometry args={[boxLength + 3, 1, boxLength + 3]}
        />
      </mesh>
      <mesh position={[boxLength / 2, -0.2, -1]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}
        />
        <boxGeometry args={[boxLength + 1, 0.6, 1]} />
      </mesh>
     <mesh position={[boxLength / 2, -0.2, boxLength + 1]}>
        <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}
        />
        <boxGeometry args={[
          boxLength + 1, 0.6, 1]} />
      </mesh>

      <mesh position={[boxLength + 1, -0.2, boxLength/2]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}
        />
        <boxGeometry args={[1, 0.6, boxLength + 3
        ]} />
      </mesh>

      <mesh position={[-1, -0.2, boxLength / 2]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}
        />
        <boxGeometry args={[1, 0.6, boxLength + 3]} />
      </mesh>
    </>
  );
}
export default Table;

//  <boxGeometry args={[length, width, height]}/>

//turn the table into a flat plane
//set the table size to be the same as all of the cells



/*

  const texture = new THREE.TextureLoader().load(img);
  const [boxLength, setBoxLength] = useState(15);

  const boardString = "111111111111111 ".repeat(15);
  const boardArray = (str => str.split(" ").map(m => m.split("").map(m => +m)))(boardString);

  useEffect(() => {
    const cellCoords = [];
    for (let i = 0; i < boardArray.length; i++) {
      for (let j = 0; j < boardArray[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: boardArray[i][j] });
      }
    }
    //setBoardConfiguration(cellCoords);
    setBoxLength(cellCoords[cellCoords.length - 1].coords[0]);
  },[]);

 // const boxLength = size[size.length - 1].coords[0]
*/