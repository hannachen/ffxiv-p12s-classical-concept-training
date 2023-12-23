import {type Group} from 'three';
import {useEffect, useRef, useState} from 'react';
import {Chain} from './Shapes/Chain';
import type {ThreeElements} from '@react-three/fiber';

const CHAIN_POSITIONS = [3, 7, 3, 7, 3];

function renderChain({onClick, answer}) {
  console.log('answer', answer);
  let chainCounter = 0;
  const chainsElements = CHAIN_POSITIONS.reduce((acc, row, rowIndex) => {
    const isHorizontal = row === 7;

    for (let i = 0; i < row; i++) {
      const isCross = isHorizontal && (i + 1) % 2 === 0;
      const shapeType = isHorizontal && isCross ? 'cross' : 'chain';
      const offsetX = i - row;
      const offsetY = rowIndex - 5;
      const x = offsetX * (isHorizontal ? 1.3 : 2.6);
      const y = offsetY * 1.3;
      const w = isHorizontal ? (isCross ? 0.35 : 0.35) : 2.25;
      const h = isHorizontal ? (isCross ? 0.35 : 2.25) : 0.35;

      const key = `${shapeType}-row${rowIndex}-${i}`;
      const element = (
        <Chain
          position={[x, y, 0]}
          handle={key}
          x={x}
          y={y}
          w={w}
          h={h}
          shapeType={shapeType}
          key={key}
          onClick={onClick}
          answer={answer && answer[chainCounter]}
        />
      );
      acc.push(element);

      if (shapeType === 'chain') {
        chainCounter++;
      }
      console.log('counter', chainCounter);
    }
    return acc;
  }, []);

  return chainsElements;
}

type ChainsLayerProps = {
  answers: string[];
} & ThreeElements['group'];
export function ChainsLayer({answers, ...groupProps}: ChainsLayerProps) {
  const groupRef = useRef<Group>(null!);
  const [answer, setAnswer] = useState<number[]>(null);

  useEffect(() => {
    setAnswer(answers.map((answer) => Number(answer)));
  }, [answers]);

  function onClick(event) {
    console.log('clicked chain', event.target);
  }

  return (
    <group {...groupProps} ref={groupRef}>
      {renderChain({onClick, answer})}
    </group>
  );
}
