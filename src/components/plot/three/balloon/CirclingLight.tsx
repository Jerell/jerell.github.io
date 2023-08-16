'use client';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export function CirclingLight(
  props: ThreeElements['pointLight'] & {
    radius: number;
    offsetX?: number;
    offsetZ?: number;
  }
) {
  const light = useRef<THREE.PointLight>(null!);
  const { radius, offsetX, offsetZ } = props;
  let time = 0;

  useFrame((state, delta) => {
    time += delta;
    light.current.position.x = radius * Math.sin(time) + (offsetX || 0);
    light.current.position.z = radius * Math.cos(time) + (offsetZ || 0);
  });

  return <pointLight {...props} ref={light} />;
}
