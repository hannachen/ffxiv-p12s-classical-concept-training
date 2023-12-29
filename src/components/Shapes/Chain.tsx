import {useState, useRef, useEffect} from 'react';
import {DoubleSide, type Mesh} from 'three';
import {TextureLoader} from 'three/src/loaders/TextureLoader';
import {useLoader, type ThreeElements} from '@react-three/fiber';
import {Edges, useCursor, Text} from '@react-three/drei';

import {GameStatus, useGame} from '../../hooks/useGame';
import {Line} from './Line';
import {ShapeType} from '../../utils/types';
import {Result} from '../Results';

import chainAlpha from '../../images/chain-alpha.png';

type ChainProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  handle: string;
  shape: ShapeType;
  answer?: number;
  debug?: boolean;
} & ThreeElements['mesh'];

const DEFAULT_COLOR = '#6b7280';
const CROSS_COLOR = '#8f8f98';

function getColor(gameStatus, shape, answer, debuffs, hovered = false) {
  if (shape === ShapeType.Cross) {
    return CROSS_COLOR;
  }

  switch (gameStatus) {
    case GameStatus.Inactive:
      return DEFAULT_COLOR;
    case GameStatus.Playing:
      return DEFAULT_COLOR;
    case GameStatus.ShowResult:
      if (answer === debuffs?.number) {
        return 'yellow';
      } else {
        return answer > 0 ? 'green' : DEFAULT_COLOR;
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
  debug = false,
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

  const alphaMap = useLoader(TextureLoader, chainAlpha);

  const onClickShape = (e) => {
    if (shape === ShapeType.Cross) {
      return;
    }
    if (status === GameStatus.Playing) {
      setGameState({
        ...gameState,
        status: GameStatus.ShowResult,
        result: answer === debuffs?.number ? Result.Correct : Result.Incorrect,
      });
    }
    onClick(e);
  };

  const fontProps = {
    fontSize: 0.2,
    letterSpacing: -0.05,
    lineHeight: 1,
    'material-toneMapped': false,
  };

  const keyLabelProps = {
    ...fontProps,
    fontSize: 0.125,
  };

  return (
    <>
      <mesh
        ref={meshRef}
        key={`shape${handle}`}
        position={[x, y, 0]}
        onClick={onClickShape}
        onPointerOver={(event) => {
          if (shape === ShapeType.Cross) {
            return;
          }
          setHover(true);
        }}
        onPointerOut={(event) => {
          if (shape === ShapeType.Cross) {
            return;
          }
          setHover(false);
        }}
        {...meshProps}
      >
        <planeGeometry key={`shape${handle}`} args={[h, w]} />
        <meshPhongMaterial
          attach="material"
          key={`mesh${handle}`}
          color={color}
          opacity={gameState.status === GameStatus.ShowResult ? 0.25 : hovered ? 0.5 : 1}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 4 : 0}
          toneMapped={false}
          transparent
          flatShading
        />
        {debug && (
          <>
            <Text {...fontProps} position={[0, -0.075, 0.15]}>
              {shape === ShapeType.Chain ? 'A' : 'C'} : {answer}
            </Text>
            <Text {...keyLabelProps} position={[0, 0.1, 0.15]}>
              {handle}
            </Text>
          </>
        )}
        {gameState.status !== GameStatus.ShowResult && shape === ShapeType.Cross && (
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
      {gameState.status === GameStatus.ShowResult && (
        <mesh
          position={[x, y, 0.15]}
          rotation={[0, 0, w < h ? (Math.PI / 180) * -90 : 0]}
        >
          {shape === ShapeType.Chain && answer ? (
            <>
              <planeGeometry key={`shape${handle}-answer`} args={[0.95, 0.25]} />
              <meshStandardMaterial
                color="#7d87fa"
                attach="material"
                transparent
                alphaMap={alphaMap}
                emissive="#7d87fa"
                emissiveIntensity={gameState.debuffs.number === answer ? 5 : 1}
                toneMapped={false}
                onBeforeCompile={(shader) => {
                  console.log(shader);
                }}
              />
            </>
          ) : null}
        </mesh>
      )}
    </>
  );
}
