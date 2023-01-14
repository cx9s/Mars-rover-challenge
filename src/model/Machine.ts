import { Position } from "./Position";
import { Orientation } from "./Orientation";

export class Machine {
  id: string;
  position: Position;
  orientation: Orientation;

  constructor(position: Position, orientation: Orientation) {
    this.id = Date.now().toString();
    this.position = position;
    this.orientation = orientation;
  }

  setPosition(position: Position): void {
    this.position = position;
  }
}
