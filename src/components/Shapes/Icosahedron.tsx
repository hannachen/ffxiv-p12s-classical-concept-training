import {type Mesh, type Group} from 'three';
import {useRef, useState} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {Edges} from '@react-three/drei';

import type {BaseShapeProps} from '../../utils/types';

export type IcosahedronProps = BaseShapeProps & ThreeElements['group'];

export function Icosahedron({
  speedMultipler = 0.35,
  onHover = (e) => {},
  debug = false,
  layers = 0,
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
        scale={debug ? (active ? 1.5 : 1) : 1}
        rotation={[1, 0, 0]}
        position={[0, 0.05, 0]}
        onClick={(event) => {
          setActive(!active);
        }}
        onPointerOver={(event) => {
          setHover(true);
          onHover(event);
        }}
        onPointerOut={(event) => {
          setHover(false);
          onHover(event);
        }}
        layers={layers}
      >
        <icosahedronGeometry args={[1.4, 0]} />
        <meshStandardMaterial
          color={debug ? (hovered ? '#36a4ff' : 'black') : 'black'}
          opacity={0.5}
          transparent
        />
        <Edges threshold={1} color="#36a4ff" layers={layers} />
      </mesh>
    </group>
  );
}
