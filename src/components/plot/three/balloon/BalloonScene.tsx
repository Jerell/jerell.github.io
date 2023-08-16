'use client';

import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { CirclingLight } from './CirclingLight';

export default function BalloonScene() {
  return (
    <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 20] }}>
      <ambientLight />
      <CirclingLight position={[0, 5, 0]} radius={5} offsetZ={10} />

      <Balloon position={[10, 1, 5]} />
      <Balloon position={[-2, 2, 2]} />
      <Balloon position={[2, 2, 2]} />
    </Canvas>
  );
}

function Balloon(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (mesh.current.rotation.y += delta));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
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
  );
}
