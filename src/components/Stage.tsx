import {Color, Vector3} from 'three';
import {Canvas} from '@react-three/fiber';
import {Cube} from './Shapes/Cube';
import {Pyramid} from './Shapes/Pyramid';
import {Icosahedron} from './Shapes/Icosahedron';
import {ChainsLayer} from './ChainsLayer';
import {useGame} from '../hooks/useGame';
import Cloud from './Cloud';

export default function Stage() {
  function getXPosition(index: number) {
    switch (index) {
      case 0:
        return -5.35;
      case 1:
        return -1.65;
      case 2:
        return 1.9;
      case 3:
        return 5.6;
    }
  }

  function getYPosition(index: number) {
    switch (index) {
      case 0:
        return 3.75;
      case 1:
        return 0.25;
      case 2:
        return -3.4;
    }
  }

  interface Position {
    x: number;
    y: number;
  }

  function letterToElement(letter: string, {x, y}: Position, key: string) {
    switch (letter) {
      case 'Y':
        return <Cube key={key} position={[x, y, -0.5]} />;
      case 'R':
        return <Pyramid key={key} position={[x, y, -0.5]} />;
      case 'B':
        return <Icosahedron key={key} position={[x, y, -0.5]} />;
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

  const {gameState} = useGame();

  const cloud = new Cloud({
    cloudSize: new Vector3(0.5, 1.0, 0.5),
    sunPosition: new Vector3(1.0, 2.0, 1.0),
    cloudColor: new Color(0xeabf6b),
    skyColor: new Color(0x337fff),
    cloudSteps: 48,
    shadowSteps: 8,
    cloudLength: 16,
    shadowLength: 2,
    noise: false
  });

  console.log('cloud', cloud);

  return (
    <Canvas
      style={{objectFit: 'cover'}}
      camera={{
        fov: 100,
        near: 0.1,
        far: 1000,
        position: [0, 4.5, 40],
        zoom: 9,
      }}>
      <ambientLight key="light" />
      <pointLight key="pointLight" position={[10, 10, 10]} />
      {gameState.shapes && renderShapes(gameState.shapes)}
      <ChainsLayer
        answers={gameState.answers}
        position={[5.3, 5.25, 10]}
        rotation={[-0.11, 0, 0]}
      />
      {cloud}
    </Canvas>
  );
}
