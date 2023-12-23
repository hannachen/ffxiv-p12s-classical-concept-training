import {type Mesh} from 'three';
import {useState, useRef} from 'react';
import type {ThreeElements} from '@react-three/fiber';
import {useDebuffs} from '../../hooks/useDebuffs';
import {DebuffsProps} from '../Debuffs';

type ChainProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  handle: string;
  shapeType: string;
  answer?: number;
} & ThreeElements['mesh'];

export function Chain({
  x,
  y,
  w,
  h,
  handle,
  shapeType,
  onClick,
  answer,
  ...meshProps
}: ChainProps) {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef<Mesh>(null!);
  const {debuffs} = useDebuffs();

  const resultColor = answer > 0 ? 'green' : 'red';

  const isAnswer = answer === debuffs?.number;
  const color = isAnswer
    ? 'yellow'
    : shapeType === 'chain'
      ? hovered
        ? 'yellow'
        : resultColor
      : 'blue';

  return (
    <mesh
      ref={meshRef}
      key={`shape${handle}`}
      position={[x, y, 0]}
      onClick={onClick}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => {
        setHover(false);
      }}
      {...meshProps}>
      <planeGeometry key={`shape${handle}`} args={[h, w]} />
      <meshStandardMaterial
        key={`mesh${handle}`}
        color={color}
        opacity={0.75}
        transparent
      />
    </mesh>
  );
}
