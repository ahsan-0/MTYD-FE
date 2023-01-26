import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Camera } from "three";
import { CameraControls } from "@react-three/drei";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Canvas>
        <CameraControls />
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
