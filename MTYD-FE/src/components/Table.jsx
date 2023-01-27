
function Table({ size }) {
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
        <mesh>
          <meshStandardMaterial />
          <boxGeometry args={[]}/>
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