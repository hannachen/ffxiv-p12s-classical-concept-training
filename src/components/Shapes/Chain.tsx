import {useState, useRef, useEffect} from 'react';
import type {ThreeElements} from '@react-three/fiber';
import {Edges, useCursor} from '@react-three/drei';
import {GameStatus, useGame} from '../../hooks/useGame';
import {Line} from './Line';
import {ShapeType} from '../../utils/types';

type ChainProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  handle: string;
  shape: ShapeType;
  answer?: number;
} & ThreeElements['mesh'];

const DEFAULT_COLOR = '#6b7280';
const CROSS_COLOR = '#9ca3af';

function getColor(gameStatus, shape, answer, debuffs, hovered = false) {
  if (shape === ShapeType.Cross) {
    return CROSS_COLOR;
  }

  switch (gameStatus) {
    case GameStatus.Inactive:
      return DEFAULT_COLOR;
    case GameStatus.Playing:
      if (hovered) {
        return 'pink';
      }
      return DEFAULT_COLOR;
    case GameStatus.ShowResult:
      if (answer === debuffs?.number) {
        return 'yellow';
      } else {
        return answer > 0 ? 'green' : 'red';
      }
    default:
      return DEFAULT_COLOR;
  }
}

export function Chain({
  x,
  y,
  w,
  h,
  handle,
  shape,
  onClick,
  answer,
  ...meshProps
}: ChainProps) {
  const [hovered, setHover] = useState(false);
  const [color, setColor] = useState(null);
  const meshRef = useRef<Mesh>(null!);
  const {gameState, setGameState} = useGame();
  const {status, debuffs} = gameState;

  useCursor(hovered, status === GameStatus.Playing ? 'pointer' : 'default');

  useEffect(() => {
    const shapeColor = getColor(status, shape, answer, debuffs, hovered);
    setColor(shapeColor);
  }, [status, hovered, shape, answer, debuffs]);

  const onClickShape = (e) => {
    if (shape === ShapeType.Cross) {
      return;
    }
    if (status === GameStatus.Playing) {
      setGameState({
        ...gameState,
        status: GameStatus.ShowResult,
      });
    }
    onClick(e);
  };

  return (
    <mesh
      ref={meshRef}
      key={`shape${handle}`}
      position={[x, y, 0]}
      onClick={onClickShape}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => {
        setHover(false);
      }}
      {...meshProps}>
      <planeGeometry key={`shape${handle}`} args={[h, w]} />
      <meshStandardMaterial key={`mesh${handle}`} color={color} />
      {shape === ShapeType.Cross && (
        <>
          <group position={[0, 0, 0.01]}>
            <Line
              start={[-w / 2, -h / 2, 0]}
              end={[w / 2, h / 2, 0]}
              color={CROSS_COLOR}
            />
            <Line
              start={[-w / 2, h / 2, 0]}
              end={[w / 2, -h / 2, 0]}
              color={CROSS_COLOR}
            />
          </group>
          <Edges threshold={1} color={CROSS_COLOR} />
        </>
      )}
    </mesh>
  );
}
