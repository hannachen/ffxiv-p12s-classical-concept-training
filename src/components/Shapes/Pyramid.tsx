import {type Mesh} from 'three';
import {useRef, useState} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {Edges} from '@react-three/drei';

import type {BaseShapeProps} from '../../utils/types';

export type PyramidProps = BaseShapeProps & ThreeElements['mesh'];

export function Pyramid({speedMultipler = 0.35, ...props}: PyramidProps) {
  const meshRef = useRef<Mesh>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (meshRef.current.rotation.y += delta * speedMultipler));

  const radius = 1.5;
  const height = 2.25;

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
      <meshStandardMaterial
        color={hovered ? 'hotpink' : 'black'}
        opacity={0.75}
        transparent
      />
      <Edges threshold={2} color="red" />
    </mesh>
  );
}
