import cn from 'classnames';
import {twMerge} from 'tailwind-merge';

import {DebuffColor, DebuffType} from '../utils/types';

import alpha from '../images/014103_hr1.png';
import beta from '../images/014104_hr1.png';

import cross from '../images/blue-cross.png';
import square from '../images/purple-square.png';
import circle from '../images/orange-circle.png';
import triangle from '../images/green-triangle.png';

export interface DebuffsProps {
  number: number;
  color: DebuffColor;
  type: DebuffType;
  className?: string;
}

export default function Debuffs({color, type, className = ''}: DebuffsProps) {
  function getColor(color) {
    switch (color) {
      case DebuffColor.Blue:
        return cross;
      case DebuffColor.Purple:
        return square;
      case DebuffColor.Orange:
        return circle;
      case DebuffColor.Green:
        return triangle;
    }
  }

  function getType(type) {
    switch (type) {
      case DebuffType.Alpha:
        return alpha;
      case DebuffType.Beta:
        return beta;
    }
  }

  return (
    <div
      className={twMerge(
        cn(
          'flex flex-row text-center justify-center items-center w-[245px] h-[70px]',
          'relative debuff-bg transition-[visibility,_opacity,_transform] duration-300 ease-in-out delay-100 overflow-visible z-20 transform-gpu',
          className
        )
      )}
    >
      {color && type && (
        <span className="flex text-xl font-semibold text-zinc-700 z-30">Debuff</span>
      )}
      {color && (
        <img
          src={getColor(color)}
          className="flex shrink-1 h-[70px] w-auto z-30"
          alt={`${color}`}
        />
      )}
      {type && (
        <img
          src={getType(type)}
          className="flex shrink-1 h-[50px] w-auto relative -top-[1px] z-30"
          alt={type}
        />
      )}
    </div>
  );
}
