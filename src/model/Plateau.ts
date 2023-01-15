import { Map } from "./Map";

export class Plateau implements Map {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    const X_DEFAULT = 100,
      Y_DEFAULT = 100;
    this.x = x > 0 && x < X_DEFAULT ? x : X_DEFAULT;
    this.y = y > 0 && y < Y_DEFAULT ? y : Y_DEFAULT;
  }
}
