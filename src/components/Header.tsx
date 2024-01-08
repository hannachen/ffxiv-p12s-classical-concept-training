import cn from 'classnames';

import cross from '../images/blue-cross.png';
import square from '../images/purple-square.png';
import circle from '../images/orange-circle.png';
import triangle from '../images/green-triangle.png';

import {Strategy, SymbolColor, DebuffColor} from '../utils/types';

interface HeaderProps {
  show: boolean;
  strategy: Strategy;
}

function renderColumn(shape: string, text: string) {
  return (
    <li key={shape} className="list-none grid col-span-1 justify-center">
      <img
        className="w-[140px] md:w-[150px] relative top-5 z-50"
        src={shape}
        alt={text}
      />
    </li>
  );
}

function getShapeImage(key: string) {
  switch (key) {
    case 'cross':
      return cross;
    case 'square':
      return square;
    case 'circle':
      return circle;
    case 'triangle':
      return triangle;
  }
}

export default function Header({show, strategy}: HeaderProps) {
  const columns = Object.values(strategy).reduce((acc, shape) => {
    const color = Object.keys(DebuffColor).find(
      (debuff) => DebuffColor[debuff] === shape
    );
    return [
      ...acc,
      renderColumn(getShapeImage(shape), `${color} - ${shape} ${SymbolColor[color]}`),
    ];
  }, []);

  return (
    <ul
      className={cn(
        show ? 'opacity-100 max-h-[85px]' : 'opacity-0 max-h-[50px]',
        'transition-[opacity,_max-height] relative -top-10 lg:-top-8 duration-300 ease-in-out',
        'grid grid-cols-4 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl'
      )}
    >
      {columns}
    </ul>
  );
}
