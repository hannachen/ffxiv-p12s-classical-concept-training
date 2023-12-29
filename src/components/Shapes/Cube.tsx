import {useRef, useState} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {type Mesh} from 'three';
import {Edges} from '@react-three/drei';

import type {BaseShapeProps} from '../../utils/types';

export type CubeProps = BaseShapeProps & ThreeElements['mesh'];

export function Cube({
  speedMultipler = 0.35,
  onHover = (e) => {},
  debug = false,
  layers = 0,
  ...meshProps
}: CubeProps) {
  const meshRef = useRef<Mesh>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (meshRef.current.rotation.y += delta * speedMultipler));

  const {scale = 1, ...props}: any = meshProps;

  return (
    <>
      <mesh
        scale={debug ? (active ? scale * 1.5 : scale) : scale}
        ref={meshRef}
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
        {...props}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          color={debug ? (hovered ? '#ffec59' : 'black') : 'black'}
          opacity={0.5}
          transparent
        />
        <Edges threshold={1} color="#ffec59" layers={layers} />
      </mesh>
    </>
  );
}
