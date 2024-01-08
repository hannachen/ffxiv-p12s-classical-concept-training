export interface BaseShapeProps {
  speedMultipler?: number;
  onHover?: (event) => void;
  debug?: boolean;
}

export interface Strategy {
  first: DebuffColor;
  second: DebuffColor;
  third: DebuffColor;
  fourth: DebuffColor;
}

export enum SymbolColor {
  Blue = '✖',
  Purple = '□',
  Orange = '◯',
  Green = '▽',
}

export enum DebuffColor {
  Blue = 'cross',
  Purple = 'square',
  Orange = 'circle',
  Green = 'triangle',
}

export enum DebuffType {
  Alpha = 'alpha',
  Beta = 'beta',
}

export const enum ShapeType {
  Chain = 'chain',
  Cross = 'cross',
}
