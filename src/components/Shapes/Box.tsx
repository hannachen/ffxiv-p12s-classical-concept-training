import {type Mesh} from 'three';
import {useRef, useState} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {Edges} from '@react-three/drei';

import type {BaseShapeProps} from '../../utils/types';

export type BoxProps = BaseShapeProps & ThreeElements['mesh'];

export function Box({speedMultipler = 0.35, ...meshProps}: BoxProps) {
  const meshRef = useRef<Mesh>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (meshRef.current.rotation.y += delta * speedMultipler));

  return (
    <mesh
      {...meshProps}
      ref={meshRef}
      // scale={active ? 1.5 : 1}
      onClick={(event) => {
        setActive(!active);
      }}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => {
        setHover(false);
      }}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? '#ffec59' : 'black'}
        opacity={0.75}
        transparent
      />
      <Edges threshold={2} color="#ffec59" />
    </mesh>
  );
}
