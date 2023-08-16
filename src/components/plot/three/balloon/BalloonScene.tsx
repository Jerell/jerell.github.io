'use client';

import { Canvas, ThreeElements, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { CirclingLight } from './CirclingLight';
import { Vector3 } from 'three';
import Button from '@/components/buttons/Button';

export default function BalloonScene() {
  const [numBalloons, setNumBallons] = useState<number>(1);
  const addBalloon = () => setNumBallons((prev) => prev + 1);
  const removeBalloon = () => setNumBallons((prev) => Math.max(0, prev - 1));

  const scale = 3;
  const spacingX = scale * 2.1;

  const getBalloonPosX = (i: number) =>
    spacingX * (i - Math.floor(numBalloons / 2));

  const balloons = Array.from({ length: numBalloons }, (_, i) => (
    <Balloon position={[getBalloonPosX(i), 2, 2]} scale={scale} key={i} />
  ));

  return (
    <Suspense>
      <div className='grid grid-cols-2 gap-2 text-center'>
        <Button className='w-full justify-center' onClick={addBalloon}>
          +
        </Button>
        <Button className='w-full justify-center' onClick={removeBalloon}>
          -
        </Button>
      </div>
      <Canvas camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 30] }}>
        <ambientLight />
        <CirclingLight position={[0, 5, 0]} radius={5} offsetZ={10} />

        {balloons}
      </Canvas>
      <p>You have selected {numBalloons} balloons.</p>
    </Suspense>
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
        <coneGeometry
          args={[
            (props.scale as number) * 0.2,
            (props.scale as number) * 0.5,
            5,
          ]}
        />
        <meshStandardMaterial
          visible
          color={hovered || active ? '#00fff5' : '#7dce82'}
        />
      </mesh>
    </>
  );
}
