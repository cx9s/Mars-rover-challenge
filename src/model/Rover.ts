import { Machine } from "./Machine";
import { Position } from "./Position";
import { Orientation, turnLeft, turnRight } from "./Orientation";
import { Probe } from "./Probe";
import { Camera } from "./Camera";
import { Action } from "./Instruction";
import { commander } from "../..";

export class Rover extends Machine {
  probe: Probe;
  camera: Camera;

  constructor(position: Position, orientation: Orientation) {
    super(position, orientation);
    this.probe = new Probe();
    this.camera = new Camera();
  }

  // action "M" processor
  moveForward(): number {
    let state = 0;
    let nextPos: Position = { x: this.position.x, y: this.position.y };

    switch (this.orientation) {
      case "N":
        nextPos.y++;
        break;
      case "E":
        nextPos.x++;
        break;
      case "S":
        nextPos.y--;
        break;
      case "W":
        nextPos.x--;
        break;
    }
    if (
      nextPos.x < 0 ||
      nextPos.x > commander.plateau.x ||
      nextPos.y < 0 ||
      nextPos.y > commander.plateau.y
    ) {
      state = 2;
    } else if (commander.checkPosition(nextPos)) {
      state = 1;
      console.log(
        `stop when (${this.position.x}, ${this.position.y}), face to ${this.orientation}`
      );
    } else {
      this.setPosition(nextPos);
      console.log(
        `rover position is (${this.position.x}, ${this.position.y}), face to ${this.orientation}`
      );
    }
    return state;
  }

  // actions processor
  action(actions: Action[]): number {
    let state = 0;
    for (const action of actions) {
      if (action === "L") {
        this.orientation = turnLeft(this.orientation);
      } else if (action === "R") {
        this.orientation = turnRight(this.orientation);
      } else if (action === "M") {
        const moveRet = this.moveForward();
        if (moveRet === 1 || moveRet === 2) {
          state = moveRet;
          break;
        }
      }
    }
    return state;
  }
}
