import {useEffect, useRef, useState} from 'react';
import {type Group} from 'three';
import type {ThreeElements} from '@react-three/fiber';

import {Chain} from './Shapes/Chain';
import {ShapeType} from '../utils/types';

const CHAIN_POSITIONS = [3, 7, 3, 7, 3];

function renderChain({onClick, answer, debug}) {
  let chainCounter = 0;
  const chainsElements = CHAIN_POSITIONS.reduce((acc, row, rowIndex) => {
    const isHorizontal = row === 7;
    const squareSize = 0.5;
    const rectangeSize = 2.75;

    for (let i = 0; i < row; i++) {
      const isCross = isHorizontal && (i + 1) % 2 === 0;
      const shapeType = isHorizontal && isCross ? ShapeType.Cross : ShapeType.Chain;
      const offsetX = i - row / 2;
      const offsetY = CHAIN_POSITIONS.length / 2 - rowIndex;
      const x =
        (offsetX * (isHorizontal ? -1.55 : -3.1) - (isHorizontal ? 0.775 : 1.55)) * -1;
      const y = (offsetY * -1.55 + 0.75) * -1;
      const w = isHorizontal ? squareSize : rectangeSize;
      const h = isHorizontal ? (isCross ? squareSize : rectangeSize) : squareSize;

      const key = `${shapeType}-row${rowIndex}-col${i}`;
      const element = (
        <Chain
          handle={key}
          x={x}
          y={y}
          w={w}
          h={h}
          shape={shapeType}
          key={key}
          onClick={onClick}
          answer={answer && answer[chainCounter]}
          debug={debug}
        />
      );
      acc.push(element);

      if (shapeType === ShapeType.Chain) {
        chainCounter++;
      }
    }
    return acc;
  }, []);

  return chainsElements;
}

type ChainsLayerProps = {
  showAnswers?: boolean;
  answers: string[];
  debug?: boolean;
} & ThreeElements['group'];

export function ChainsLayer({
  showAnswers = false,
  answers,
  debug = false,
  ...groupProps
}: ChainsLayerProps) {
  const groupRef = useRef<Group>(null!);
  const composerRef = useRef(null);

  const [answer, setAnswer] = useState<number[]>(null);

  useEffect(() => {
    if (answers) {
      setAnswer(answers.map((answer) => Number(answer)));
    }
  }, [answers]);

  function onClick(event) {
    console.log('clicked chain', event.target);
  }

  return (
    <group {...groupProps} ref={groupRef}>
      {renderChain({onClick, answer, debug})}
    </group>
  );
}
