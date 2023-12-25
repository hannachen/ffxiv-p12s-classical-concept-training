export interface BaseShapeProps {
  speedMultipler?: number;
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
