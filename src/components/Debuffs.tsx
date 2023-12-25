import {DebuffColor, DebuffType} from '../utils/types';

export interface DebuffsProps {
  number: number;
  color: DebuffColor;
  type: DebuffType;
}

export default function Debuffs({color, type}: DebuffsProps) {
  return (
    <div className="grid col-span-4 col-start-5 text-center">
      Debuffs
      {type && `Type: ${type}`}
      {color && `Color: ${color}`}
    </div>
  );
}
