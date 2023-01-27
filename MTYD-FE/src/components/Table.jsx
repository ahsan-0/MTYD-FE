
function Table({ size }) {
    console.log(size[size.length - 1].coords[0])
    return (
        <>
        <mesh position={[(size[size.length - 1].coords[0] / 2), -1, (size[size.length - 1].coords[0] / 2)]}>
            <meshStandardMaterial />
            <boxGeometry args={
                [size[size.length - 1].coords[0] + 3,
                1,
                size[size.length - 1].coords[0] + 3
                ]}/>   
        </mesh>
        <mesh position={[(size[size.length - 1].coords[0] / 2), -0.5, (size[size.length - 1].coords[0] / 2) - 3]}>
          <meshStandardMaterial />
          <boxGeometry args={
                [size[size.length - 1].coords[0] + 3,
                1,
                1
                ]}/>
        </mesh>

        <mesh position={[(size[size.length - 1].coords[0] / 2), -1, (size[size.length - 1].coords[0] / 2)]}>>
          <meshStandardMaterial />
          <boxGeometry />
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