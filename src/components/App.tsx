import {useState} from 'react';
import cn from 'classnames';

import Stage from './Stage';
import Settings from './Settings';
import {DebuffsProps} from './Debuffs';
import {DebuffColor, DebuffType} from '../utils/types';
import {DebuffsContext} from '../hooks/useDebuffs';

const questions = [
  {
    shapes: 'BRYRYRBBRBYY',
    answer: '10020670500008340',
  },
  {
    shapes: 'YYBYBRRBYBRR',
    answer: '06020581000007430',
  },
  {
    shapes: 'YYBYBYRBRBRR',
    answer: '06020580001407030',
  },
  {
    shapes: 'RBRYBYRBYRBY',
    answer: '03014080072000056',
  },
  {
    shapes: 'YBYYBRYBRRBR',
    answer: '04023080001067050',
  },
  {
    shapes: 'YBYBYRBRBRRB',
    answer: '00823070401000056',
  },
  {
    shapes: 'YBYBRRYRBYBR',
    answer: '40803070001060205',
  },
  {
    shapes: 'YBRYRYBBBYRR',
    answer: '43000080601057200',
  },
  {
    shapes: 'BRBYYYRYRBRB',
    answer: '10620500000408307',
  },
  {
    shapes: 'YRBYBYRBRBRY',
    answer: '05620000071408030',
  },
  {
    shapes: 'RBYRBYRBRYBY',
    answer: '34000072001058060',
  },
  {
    shapes: 'YYBRBBRYRYRB',
    answer: '06520000301408007',
  },
];

function getColor(seed: number): DebuffColor {
  switch (seed) {
    case 1:
    case 2:
      return DebuffColor.Blue;
    case 3:
    case 4:
      return DebuffColor.Purple;
    case 5:
    case 6:
      return DebuffColor.Orange;
    case 7:
    case 8:
      return DebuffColor.Green;
  }
}

function getType(seed: number): DebuffType {
  return seed % 2 == 0 ? DebuffType.Beta : DebuffType.Alpha;
}

function assignDebuffs(): DebuffsProps {
  const debuff = Math.floor(Math.random() * 7) + 1;

  return {
    number: debuff,
    color: getColor(debuff),
    type: getType(debuff),
  };
}

type GridProps = string[][];

function getGrid(seed: number): GridProps {
  const selected = Array.from(questions[seed].shapes);
  const cols = 4;

  const result = selected.reduce((acc, curr, i) => {
    const index = Math.floor(i / cols);
    console.log('index', index);
    acc[index] = acc[index] ? [...acc[index], curr] : [curr];
    return acc;
  }, []);

  console.log(result);

  return result;
}

export default function App() {
  const [grid, setGrid] = useState<string[][]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [debuffs, setDebuffs] = useState<DebuffsProps>();

  function onStartButtonClick(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 11);
    console.log('randomNumber', randomNumber);
    setGrid(getGrid(randomNumber));
    setAnswers(Array.from(questions[randomNumber].answer));
    setDebuffs(assignDebuffs());
  }

  return (
    <DebuffsContext.Provider value={{debuffs, setDebuffs}}>
      <div
        className={cn(
          'mx-auto h-full pt-14 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg',
          'bg-gradient-to-r from-violet-300 via-yellow-100 to-pink-200 background-animate'
        )}>
        <div className="w-full h-[50vh] md:h-[70vh] lg:h-[80vh]">
          <Stage shapes={grid} debuffs={debuffs} answers={answers} />
        </div>
        <Settings onStart={(e) => onStartButtonClick(e)} />
      </div>
    </DebuffsContext.Provider>
  );
}
