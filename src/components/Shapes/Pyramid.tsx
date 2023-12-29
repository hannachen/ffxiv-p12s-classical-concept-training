import {type Mesh} from 'three';
import {useRef, useState} from 'react';
import {useFrame, type ThreeElements} from '@react-three/fiber';
import {Edges} from '@react-three/drei';

import type {BaseShapeProps} from '../../utils/types';

export type PyramidProps = BaseShapeProps & ThreeElements['mesh'];

export function Pyramid({
  speedMultipler = 0.35,
  onHover = (e) => {},
  debug = false,
  layers = 0,
  ...props
}: PyramidProps) {
  const meshRef = useRef<Mesh>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => (meshRef.current.rotation.y += delta * speedMultipler));

  const {scale = 1, ...rest}: any = props;

  const radius = 1.5;
  const height = 2.25;

  return (
    <mesh
      ref={meshRef}
      scale={debug ? (active ? scale * 1.5 : scale) : scale}
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
      {...rest}
    >
      <cylinderGeometry args={[0, radius, height, 4, 1]} />
      <meshBasicMaterial
        color={debug ? (hovered ? '#dc2626' : 'black') : 'black'}
        opacity={0.5}
        transparent
      />
      <Edges threshold={1} color="#dc2626" layers={layers} />
    </mesh>
  );
}
