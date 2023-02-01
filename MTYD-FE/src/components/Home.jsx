import {
  CameraControls,
  Center,
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import retro from "../assets/retro.json";
import { Bloom, EffectComposer, Outline, Glitch, Noise } from "@react-three/postprocessing";
import { Physics, useBox } from "@react-three/cannon";
import { GlitchMode,BlendFunction } from "postprocessing";

function Box(position) {
  const [ref, api] = useBox(() => ({ mass: 2, position : [0, 10, 0] }));
 return (
  <mesh ref={ref}
    onClick={() => {
    api.velocity.set(direction, direction, direction);
    }} >
    <boxGeometry attach="geometry" args={[3, 3, 3]}/>
    <meshLambertMaterial emissive="hotpink" emissiveIntensity={1} attach="material" color="hotpink" />
  </mesh>
 )
}

const Home = () => {
  function MatCap({ texture }) {
    const [matcap] = useMatcapTexture(texture, 256);
    return <meshMatcapMaterial matcap={matcap} />;
  }

  return (
    <section className="anim">
      <Canvas>
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1}></Bloom>
          <Outline blur edgeStrength={100} />
          <Noise
    premultiply // enables or disables noise premultiplication
    blendFunction={BlendFunction.ADD} // blend mode
  />
   <Glitch
        delay={[0.5, 1.5]}
        duration={[0.6, 1.0]}
        strength={[0.1, 0.2]}
        mode={GlitchMode.SPORADIC} // try CONSTANT_MILD
        active // toggle on/off
        ratio={0.1}
      />
        </EffectComposer>
        <PerspectiveCamera makeDefault fov={75} position={[10, 10, 10]} />
        <CameraControls />

        <ambientLight intensity={0.8} />
        <Physics>
        </Physics>
        <Float
          speed={2.4}
          rotationIntensity={2.4}
          floatIntensity={2}
          floatingRange={[-2, 2]}
        >
          <Center>
            <Text3D
              font={retro}
              height={0.5}
              letterSpacing={-0.06}
              size={2.8}
              curveSegments={10}
              bevelEnabled
              bevelThickness={0.02}
              bevelOffset={0}
              bevelSegments={5}
            >
              {" "}
              AUTOMATRIX
              <MatCap texture={"422509_C89536_824512_0A0604"} />{" "}
            </Text3D>

            <mesh position={[2, -4, 0]}>
              <Text3D
                font={retro}
                height={0.5}
                letterSpacing={-0.06}
                size={2}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                {" "}
                Multiply or die.
                <MatCap texture={"3B3C3F_DAD9D5_929290_ABACA8"} />{" "}
              </Text3D>
            </mesh>
          </Center>
        </Float>
      </Canvas>
    </section>
  );
};

export default Home;
