import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function RoomEnvironment() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2f2f2f" />
      </mesh>

      <mesh position={[0, 3, -6]} receiveShadow>
        <boxGeometry args={[20, 6, 0.2]} />
        <meshStandardMaterial color="#3d3d3d" />
      </mesh>

      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      <mesh position={[10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 6, 0.2]} />
        <meshStandardMaterial color="#262626" />
      </mesh>

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

function clampPosition(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function GltfModel({ object }) {
  const gltf = useGLTF(object.modelUrl);

  const clonedScene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);

  return <primitive object={clonedScene} />;
}

function SceneObject({ object, onObjectMove, onDragStart, onDragEnd }) {
  const objectRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragPlaneRef = useRef(new THREE.Plane());
  const dragOffsetRef = useRef(new THREE.Vector3());

  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const position = object.position || [0, 0.5, 0];
  const objectY = position[1] || 0.5;
  const scale = object.scale || [1, 1, 1];

  const handlePointerDown = (event) => {
    event.stopPropagation();

    isDraggingRef.current = true;
    setIsDragging(true);
    onDragStart();

    event.target.setPointerCapture(event.pointerId);

    const currentPosition = new THREE.Vector3(
      position[0],
      position[1],
      position[2]
    );

    dragPlaneRef.current.set(new THREE.Vector3(0, 1, 0), -objectY);

    const hitPoint = new THREE.Vector3();

    if (event.ray.intersectPlane(dragPlaneRef.current, hitPoint)) {
      dragOffsetRef.current.copy(currentPosition).sub(hitPoint);
    }
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) {
      return;
    }

    event.stopPropagation();

    const hitPoint = new THREE.Vector3();

    if (event.ray.intersectPlane(dragPlaneRef.current, hitPoint)) {
      const nextX = clampPosition(
        hitPoint.x + dragOffsetRef.current.x,
        -8.5,
        8.5
      );

      const nextZ = clampPosition(
        hitPoint.z + dragOffsetRef.current.z,
        -4.8,
        4.8
      );

      onObjectMove(object.id, [
        Number(nextX.toFixed(2)),
        objectY,
        Number(nextZ.toFixed(2)),
      ]);
    }
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();

    isDraggingRef.current = false;
    setIsDragging(false);
    onDragEnd();

    event.target.releasePointerCapture(event.pointerId);
  };

  const groupScale = isDragging
    ? scale.map((value) => value * 1.15)
    : scale;

  const commonGroupProps = {
    ref: objectRef,
    position,
    scale: groupScale,
    castShadow: true,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerOver: (event) => {
      event.stopPropagation();
      setIsHovered(true);
      document.body.style.cursor = "grab";
    },
    onPointerOut: () => {
      setIsHovered(false);
      document.body.style.cursor = "default";
    },
  };

  if (object.type === "sphere") {
    return (
      <mesh {...commonGroupProps}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color={isDragging ? "#ffd166" : isHovered ? "#5fa8d3" : "#457b9d"}
        />
      </mesh>
    );
  }

  if (object.type === "custom-model-1" || object.type === "custom-model-2") {
    return (
      <group {...commonGroupProps}>
        <Suspense fallback={null}>
          <GltfModel object={object} />
        </Suspense>
      </group>
    );
  }

  return (
    <mesh {...commonGroupProps}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={isDragging ? "#ffd166" : isHovered ? "#ff6b6b" : "#e63946"}
      />
    </mesh>
  );
}

function SceneObjects({ objects, onObjectMove, onDragStart, onDragEnd }) {
  return (
    <>
      {objects.map((object) => (
        <SceneObject
          key={object.id}
          object={object}
          onObjectMove={onObjectMove}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </>
  );
}

export default function SceneCanvas({ objects = [], onObjectMove }) {
  const [isDraggingObject, setIsDraggingObject] = useState(false);

  return (
    <Canvas
      shadows
      camera={{
        position: [4, 4, 7],
        fov: 50,
      }}
    >
      <color attach="background" args={["#181818"]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />

      <RoomEnvironment />

      <SceneObjects
        objects={objects}
        onObjectMove={onObjectMove}
        onDragStart={() => setIsDraggingObject(true)}
        onDragEnd={() => setIsDraggingObject(false)}
      />

      <OrbitControls makeDefault enabled={!isDraggingObject} />
    </Canvas>
  );
}