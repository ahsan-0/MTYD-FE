
function Cell({ position, living }) {
    return (
        <mesh position={position}>
            {  living === 1 ?
            <meshStandardMaterial emissive="yellow" emissiveIntensity={2} toneMapped={false} opacity={0.5} />
            :
            <meshStandardMaterial transparent opacity={0.1} />
            }
            <boxGeometry />
        </mesh>
    );
}
export default Cell;