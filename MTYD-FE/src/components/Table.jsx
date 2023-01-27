import img from "./metal.png";
import * as THREE from "three";
const texture = new THREE.TextureLoader().load(img);
function Table({ size }) {
  return (
    <>
      <mesh
        position={[
          size[size.length - 1].coords[0] / 2,
          -1,
          size[size.length - 1].coords[0] / 2,
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
        <boxGeometry
          args={[
            size[size.length - 1].coords[0] + 3,
            1,
            size[size.length - 1].coords[0] + 3,
          ]}
        />
      </mesh>
      <mesh>
        <meshStandardMaterial />
        <boxGeometry args={[]} />
      </mesh>

      <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>

      <mesh>
        <meshStandardMaterial />
        <boxGeometry />
      </mesh>
    </>
  );
}
export default Table;

//  <boxGeometry args={[length, width, height]}/>

//turn the table into a flat plane
//set the table size to be the same as all of the cells
