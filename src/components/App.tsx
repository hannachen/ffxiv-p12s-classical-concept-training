import {useState} from 'react';
import cn from 'classnames';

import Stage from './Stage';
import Settings from './Settings';
import {DebuffsProps} from './Debuffs';
import {DebuffColor, DebuffType} from '../utils/types';
import {GameStatus, useGame} from '../hooks/useGame';
import Header from './Header';
import {Results} from './Results';
import {defaultAssignments} from './PositionAssignments';

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

  return result;
}

export default function App() {
  const {gameState, setGameState} = useGame();
  const [showHeader, setShowHeader] = useState(true);
  const [startTime, setStartTime] = useState(null);

  function handleGameStart(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 11);
    setStartTime(new Date().getTime());

    setGameState({
      status: GameStatus.Playing,
      shapes: getGrid(randomNumber),
      answers: Array.from(questions[randomNumber].answer),
      debuffs: assignDebuffs(),
      strategy: defaultAssignments,
      startTime,
      debug: false,
    });
  }

  function handleGameStop(e) {
    e.preventDefault();

    setGameState({
      ...gameState,
      status: GameStatus.ShowResult,
    });
  }

  function handleGameReset(e) {
    e.preventDefault();

    setGameState({
      ...gameState,
      status: GameStatus.Inactive,
      shapes: null,
      answers: null,
      debuffs: null,
      strategy: defaultAssignments,
    });
  }

  function handleHeaderToggle() {
    setShowHeader(!showHeader);
  }

  return (
    <div className="h-full bg-neutral-900 relative overflow-hidden">
      <Results result={gameState.result} />
      <div>
        <Header show={showHeader} strategy={gameState.strategy} />
        <div
          className={cn(
            ' mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl h-full rounded-[25px]',
            'bg-gradient-to-r from-yellow-200 via-pink-300 via-30% via-blue-400 via-40% to-purple-300 background-animate'
          )}
        >
          <div className="w-full h-[320px] md:h-[460px] lg:h-[725px] xl:h-[880px]">
            <Stage />
          </div>
        </div>
      </div>
      <Settings
        onGameStart={(e) => handleGameStart(e)}
        onGameStop={(e) => handleGameStop(e)}
        onGameReset={(e) => handleGameReset(e)}
        onOpenHeader={handleHeaderToggle}
        onCloseHeader={handleHeaderToggle}
        startTime={startTime}
      />
    </div>
  );
}
