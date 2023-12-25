import {useState} from 'react';
import cn from 'classnames';

import Stage from './Stage';
import Settings from './Settings';
import {DebuffsProps} from './Debuffs';
import {DebuffColor, DebuffType} from '../utils/types';
import {GameStatus, useGame} from '../hooks/useGame';
import cross from '../images/blue-cross.png';
import square from '../images/purple-square.png';
import circle from '../images/orange-circle.png';
import triangle from '../images/green-triangle.png';

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
    acc[index] = acc[index] ? [...acc[index], curr] : [curr];
    return acc;
  }, []);

  console.log(result);

  return result;
}

export default function App() {
  const {gameState, setGameState} = useGame();
  const [showHeader, setShowHeader] = useState(true);

  function handleGameStart(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 11);

    setGameState({
      status: GameStatus.Playing,
      shapes: getGrid(randomNumber),
      answers: Array.from(questions[randomNumber].answer),
      debuffs: assignDebuffs(),
    });
  }

  function handleGameStop(e) {
    e.preventDefault();

    setGameState({
      ...gameState,
      status: GameStatus.ShowResult,
    });
  }

  function handleHeaderToggle() {
    setShowHeader(!showHeader);
  }

  return (
    <div className="h-full bg-neutral-900 relative overflow-hidden">
      <div className={cn(showHeader ? 'pt-0' : 'pt-8')}>
        {showHeader &&
          <ul className='grid grid-cols-4 mx-auto max-w-[450] md:max-w-[630] lg:max-w-[740] xl:max-w-[1024] max-h-[100px] relative -top-6'>
            <li className="list-none grid col-span-1 justify-center"><img className='w-[150px] relative top-5' src={cross} alt={`Blue - Cross ◯`} /></li>
            <li className="list-none grid col-span-1 justify-center"><img className='w-[150px] relative top-5' src={square} alt={`Purple - Square ■`} /></li>
            <li className="list-none grid col-span-1 justify-center"><img className='w-[150px] relative top-5' src={circle} alt={`Orange - Circle ◯`} /></li>
            <li className="list-none grid col-span-1 justify-center"><img className='w-[150px] relative top-5' src={triangle} alt={`Orange - Circle ▽`} /></li>
          </ul>
        }
        <div
          className={cn(
            'mx-auto max-w-[450] md:max-w-[630] lg:max-w-[740] xl:max-w-[1024] h-full rounded-[25px] pt-5',
            'bg-gradient-to-r from-yellow-200 via-pink-300 via-30% via-blue-400 via-40% to-purple-300 background-animate'
          )}>
          <div className="w-full h-[50vh] md:h-[70vh] lg:h-[90vh]">
            <Stage />
          </div>
        </div>
      </div>
        <Settings onGameStart={(e) => handleGameStart(e)} onGameStop={(e) => handleGameStop(e)} onOpenHeader={handleHeaderToggle} onCloseHeader={handleHeaderToggle} />
    </div>
  );
}
