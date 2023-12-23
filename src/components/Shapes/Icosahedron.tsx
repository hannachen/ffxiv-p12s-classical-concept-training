import type {Mesh, Group } from 'three';
import {useRef, useState} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {Edges} from '@react-three/drei';

import type {BaseShapeProps} from '../../utils/types';

export type IcosahedronProps = BaseShapeProps & ThreeElements['group'];

export function Icosahedron({
  speedMultipler = 0.35,
  ...groupProps
}: IcosahedronProps) {
  const meshRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef} {...groupProps}>
      <mesh
        ref={meshRef}
        scale={active ? 1.5 : 1}
        rotation={[1, 0, 0]}
        onClick={(event) => {
          setActive(!active);
        }}
        onPointerOver={(event) => {
          setHover(true);
        }}
        onPointerOut={(event) => {
          setHover(false);
        }}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'black'} opacity={0.8} transparent />
        <Edges threshold={2} color="#36a4ff" />
      </mesh>
    </group>
  );
}
