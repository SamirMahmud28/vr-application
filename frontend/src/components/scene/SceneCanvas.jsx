import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";

function RoomEnvironment() {
  return (
    <>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2f2f2f" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 3, -6]} receiveShadow>
        <boxGeometry args={[20, 6, 0.2]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#262626" />
      </mesh>

      {/* Floor grid helper */}
      <Grid
        args={[20, 20]}
        position={[0, 0.01, 0]}
        cellSize={1}
        cellThickness={0.5}
        sectionSize={5}
        sectionThickness={1}
        fadeDistance={25}
        fadeStrength={1}
      />
    </>
  );
}

function SceneObject({ object }) {
  const position = object.position || [0, 0.5, 0];

  if (object.type === "sphere") {
    return (
      <mesh position={position} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#457b9d" />
      </mesh>
    );
  }

  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#e63946" />
    </mesh>
  );
}

function SceneObjects({ objects }) {
  return (
    <>
      {objects.map((object) => (
        <SceneObject key={object.id} object={object} />
      ))}
    </>
  );
}

export default function SceneCanvas({ objects = [] }) {
  return (
    <Canvas
      shadows
      camera={{
        position: [4, 4, 7],
        fov: 50,
      }}
    >
      <color attach="background" args={["#181818"]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />

      <RoomEnvironment />
      <SceneObjects objects={objects} />

      {/* Mouse camera control */}
      <OrbitControls makeDefault />
    </Canvas>
  );
}