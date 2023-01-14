import { Position } from "./Position";

export interface Plateau {
  readonly x: number;
  readonly y: number;
}

export function createPlateau(x: number, y: number): Plateau {
  const X_DEFAULT = 100,
    Y_DEFAULT = 100;
  x = x > 0 && x < X_DEFAULT ? x : X_DEFAULT;
  y = y > 0 && y < Y_DEFAULT ? y : Y_DEFAULT;
  return { x: x, y: y };
}
