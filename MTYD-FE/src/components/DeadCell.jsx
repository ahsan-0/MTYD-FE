function DeadCell() {
    return (
        <mesh>
            <meshStandardMaterial transparent opacity={0.1} />
            <boxGeometry />
        </mesh>
    );
}
export default DeadCell;