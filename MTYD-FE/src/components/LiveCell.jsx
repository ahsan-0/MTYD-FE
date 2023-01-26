function LiveCell() {
    return (
        <mesh>
            <meshStandardMaterial transparent emissive="yellow" emissiveIntensity={2} toneMapped={false} opacity={0.5} />
            <boxGeometry />
        </mesh>
    );
}
export default LiveCell;