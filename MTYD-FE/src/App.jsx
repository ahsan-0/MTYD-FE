import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Camera } from "three";
import { CameraControls, Sky, Sparkles } from "@react-three/drei";
import LiveCell from "./components/LiveCell";
import DeadCell from "./components/DeadCell";
import PlayArea from "./components/PlayArea";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Sparkles {...props} />
        <Sky exposure={0.01} elevation={0.01} azimuth={90} rayleigh={0} />
        <CameraControls />
        <PlayArea />
      </Canvas>
    </div>
  );
}

export default App;

const props = {
  /** Number of particles (default: 100) */ count: 10000,
  /** Speed of particles (default: 1) */
  speed: 1,
  /** Opacity of particles (default: 1) */
  opacity: 1,
  /** Color of particles (default: 100) */
  color: 100,
  /** Size of particles (default: randomized between 0 and 1) */
  size: 5,
  /** The space the particles occupy (default: 1) */
  scale: [100, 100, 100],
  /** Movement factor (default: 1) */
  noise: 1,
};
