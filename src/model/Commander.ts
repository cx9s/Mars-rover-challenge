import { Plateau } from "./Plateau";
import { Position } from "./Position";
import { Rover } from "./Rover";

export class Commander {
  captain: string;
  plateau: Plateau;
  roverTeam: Rover[];

  constructor() {
    this.captain = "";
    this.plateau = { x: 0, y: 0 };
    this.roverTeam = [];
  }

  setMap(plateau: Plateau): void {
    this.plateau = plateau;
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

  reset(): void {
    this.captain = "";
    this.plateau = { x: 0, y: 0 };
    this.roverTeam = [];
  }
}
