import cn from 'classnames';

import {GameStatus, useGame} from '../hooks/useGame';

import cross from '../images/blue-cross.png';
import square from '../images/purple-square.png';
import circle from '../images/orange-circle.png';
import triangle from '../images/green-triangle.png';

interface HeaderProps {
  show: boolean;
}

function renderColumn(shape: string, text: string) {
  return (
    <li className="list-none grid col-span-1 justify-center">
      <img className="w-[150px] relative top-5 z-50" src={shape} alt={text} />
    </li>
  );
}

export default function Header({show}: HeaderProps) {
  const {gameState, setGameState} = useGame();

  return (
    <ul
      className={cn(
        show ? 'opacity-100 max-h-[85px]' : 'opacity-0 max-h-[50px]',
        'transition-[opacity,_max-height] relative -top-10 lg:-top-8 duration-300 ease-in-out',
        'grid grid-cols-4 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'
      )}
    >
      {renderColumn(cross, 'Blue - Cross ✖')}
      {renderColumn(square, 'Purple - Square □')}
      {renderColumn(circle, 'Orange - Circle ◯')}
      {renderColumn(triangle, 'Orange - Triangle ▽')}
    </ul>
  );
}
