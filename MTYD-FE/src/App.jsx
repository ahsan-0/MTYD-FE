import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Camera } from "three";
import { CameraControls, Center, Sky, Sparkles } from "@react-three/drei";
import PlayArea from "./components/PlayArea";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Sparkles {...props} />
        <pointLight position={[10, 0, 10]}/>
        <Sky exposure={0.01} elevation={0.01} azimuth={90} rayleigh={0} />
        <CameraControls />
        <Center><PlayArea /></Center>
        {false && <><Suspense fallback={<Html center>Loading.</Html>}>
        <Scene />
      </Suspense>
        <EffectComposer multisampling={0} disableNormalPass={true}>
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3}/>
          <Noise opacity={0.02} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer></>}
      
      </Canvas>
    </div>
  );
}

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

export default App;