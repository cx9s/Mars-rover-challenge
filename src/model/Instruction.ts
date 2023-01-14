import { Position } from "./Position";
import { Orientation } from "./Orientation";
import { type } from "os";

const directions = ["L", "R"] as const;
export type Direction = typeof directions[number];

export type Move = "M";

export type Action = Direction | Move;

interface Instruction {}

export interface PlateauInst extends Instruction {
  x: number;
  y: number;
}

export interface RoverInitInst extends Instruction {
  position: Position;
  orientation: Orientation;
}

// export interface RoverActionInst extends Instruction {
//   actions: Action[];
// }
