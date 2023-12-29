import {useRef} from 'react';
import {Canvas, extend} from '@react-three/fiber';
import {Effects} from '@react-three/drei';
import {ACESFilmicToneMapping, type Group} from 'three';
import {EffectComposer, Bloom, ToneMapping} from '@react-three/postprocessing';
import {UnrealBloomPass} from 'three-stdlib';
import {OutputPass} from 'three/examples/jsm/postprocessing/OutputPass';

import {Cube} from './Shapes/Cube';
import {Pyramid} from './Shapes/Pyramid';
import {Icosahedron} from './Shapes/Icosahedron';
import {ChainsLayer} from './ChainsLayer';
import {GameStatus, useGame} from '../hooks/useGame';

extend({EffectComposer, UnrealBloomPass, OutputPass});

export default function Stage() {
  const composerRef = useRef(null!);
  const {
    gameState: {status, shapes, answers, debug},
  } = useGame();

  function getXPosition(index: number) {
    switch (index) {
      case 0:
        return -4.7;
      case 1:
        return -1.55;
      case 2:
        return 1.55;
      case 3:
        return 4.7;
    }
  }

  function getYPosition(index: number) {
    switch (index) {
      case 0:
        return 3.05;
      case 1:
        return 0;
      case 2:
        return -3.25;
    }
  }

  interface Position {
    x: number;
    y: number;
  }

  function handleShapeHover(e) {
    console.log('e', e);
  }

  function letterToElement(
    letter: string,
    {x, y}: Position,
    key: string,
    scale: number = 0.75
  ) {
    switch (letter) {
      case 'Y':
        return (
          <Cube
            key={key}
            scale={scale}
            position={[x, y, 0]}
            onHover={(e) => handleShapeHover(e)}
            debug={debug}
          />
        );
      case 'R':
        return (
          <Pyramid
            key={key}
            scale={scale}
            position={[x, y, 0]}
            onHover={handleShapeHover}
            debug={debug}
          />
        );
      case 'B':
        return (
          <Icosahedron
            key={key}
            scale={scale}
            position={[x, y, 0]}
            onHover={handleShapeHover}
            debug={debug}
          />
        );
      default:
        return null;
    }
  }

  function getLetterOffset(letter: string): Position {
    switch (letter) {
      case 'Y':
        return {x: 0, y: 0};
      case 'R':
        return {x: 0, y: 0.15};
      case 'B':
        return {x: 0, y: 0};
    }
  }

  function renderShapes(shapes: string[][]): any {
    const elements = shapes.reduce((acc, row, rowIndex) => {
      const currentRow = row.reduce((rowAcc, letter, colIndex) => {
        const letterOffset = getLetterOffset(letter);
        const x = getXPosition(colIndex) + letterOffset.x;
        const y = getYPosition(rowIndex) + letterOffset.y;
        const key = `row${rowIndex}Col${colIndex}`;

        return [...rowAcc, letterToElement(letter, {x, y}, key)];
      }, []);

      return [...acc, ...currentRow];
    }, []);

    return elements;
  }

  return (
    <Canvas
      style={{objectFit: 'cover'}}
      camera={{
        fov: 100,
        near: 0.1,
        far: 1000,
        position: [0, 0.75, 40],
        zoom: 10,
        layers: 0,
      }}
      flat
    >
      {debug && <axesHelper key="axesHelper" args={[5]} />}
      <ambientLight />
      <scene position={[0, 0, -0.15]} rotation={[0.15, 0, 0]}>
        {shapes && renderShapes(shapes)}
      </scene>

      {status === GameStatus.ShowResult && (
        <Effects ref={composerRef} disableGamma>
          <unrealBloomPass threshold={1} strength={1} exposure={1} radius={0.5} />
          <outputPass args={[ACESFilmicToneMapping]} />
        </Effects>
      )}

      <ChainsLayer
        answers={answers}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        debug={debug}
      />
    </Canvas>
  );
}
