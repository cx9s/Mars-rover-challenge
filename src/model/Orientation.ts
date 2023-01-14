import { Direction } from "./Instruction";

const orientations = ["N", "E", "S", "W"] as const;
export type Orientation = typeof orientations[number];

export function turnLeft(orientation: Orientation): Orientation {
  let cursor: number = orientations.indexOf(orientation);
  cursor = cursor === 0 ? 3 : cursor - 1;
  return orientations[cursor];
}

export function turnRight(orientation: Orientation): Orientation {
  let cursor: number = orientations.indexOf(orientation);
  cursor = cursor === 3 ? 0 : cursor + 1;
  return orientations[cursor];
}
