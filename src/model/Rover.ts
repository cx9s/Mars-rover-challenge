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

  action(actions: Action[]): void {
    let state = 0;
    for (const action of actions) {
      if (action === "L") {
        this.orientation = turnLeft(this.orientation);
        console.log(`turn left to ${this.orientation}`);
      } else if (action === "R") {
        this.orientation = turnRight(this.orientation);
        console.log(`turn left to ${this.orientation}`);
      } else if (action === "M") {
        const moveRet = this.moveForward();
        if (moveRet === 1 || moveRet === 2) {
          state = moveRet;
          break;
        }
      }
    }
    const states: string[] = [
      `Done.`,
      `The next position is occupied. I'm at (${this.position.x}, ${this.position.y}), face to ${this.orientation}`,
      `The next position is out of map. I'm at (${this.position.x}, ${this.position.y}), face to ${this.orientation}`,
    ];
    console.log(states[state]);
  }
}
