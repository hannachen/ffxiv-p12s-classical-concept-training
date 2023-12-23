import { type Mesh } from 'three';
import { useRef, useState } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export function Pyramid(props: ThreeElements['mesh']) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.y += delta * 0.35));

  const radius = 1.5;
  const height = 2.25;

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active);
      }}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => {
        setHover(false);
      }}>
      <cylinderGeometry args={[0, radius, height, 4, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'black'} opacity={0.75} transparent />
      <Edges threshold={2} color="red" />
    </mesh>
  );
}
