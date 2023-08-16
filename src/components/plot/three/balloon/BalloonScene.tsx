'use client';

import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { CirclingLight } from './CirclingLight';
import { Vector3 } from 'three';

export default function BalloonScene() {
  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 20] }}>
      <ambientLight />
      <CirclingLight position={[0, 5, 0]} radius={5} offsetZ={10} />

      <Balloon position={[-4, 2, 2]} scale={1.5} />
      <Balloon position={[0, 2, 2]} scale={1.5} />
      <Balloon position={[4, 2, 2]} scale={1.5} />
    </Canvas>
  );
}

function Balloon(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.y += delta));

  const position = props.position as [number, number, number];
  const tiePosition = [
    position[0],
    position[1] - (props.scale as number),
    position[2],
  ];

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <sphereGeometry args={[1, 32, 16]} />
        <meshStandardMaterial
          visible
          color={hovered || active ? '#00fff5' : '#7dce82'}
        />
      </mesh>
      <mesh position={new Vector3(...tiePosition)}>
        <coneGeometry args={[0.3, 0.8, 5]} />
        <meshStandardMaterial
          visible
          color={hovered || active ? '#00fff5' : '#7dce82'}
        />
      </mesh>
    </>
  );
}
