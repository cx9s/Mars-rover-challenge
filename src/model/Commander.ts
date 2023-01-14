import { Rover } from "./Rover";
import { Position } from "./Position";

export class Commander {
  roverTeam: Rover[];

  constructor() {
    this.roverTeam = [];
  }

  dispatch(rover: Rover): void {
    this.roverTeam.push(rover);
  }

  recall(rover: Rover): void {
    this.roverTeam.splice(this.roverTeam.indexOf(rover), 1);
  }

  checkPosition(position: Position): boolean {
    let ret = false;
    this.roverTeam.find((rover, index) => {
      if (rover.position.x === position.x && rover.position.y === position.y) {
        ret = true;
      }
    });
    return ret;
  }
}
