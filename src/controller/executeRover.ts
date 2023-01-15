import { clear, print, dialog } from "../../console";
import { errorHandle, commander } from "../..";
import { Rover } from "../model/Rover";
import { Orientation } from "../model/Orientation";
import { Action } from "../model/Instruction";
import { chooseInstruction } from "./chooseInstruction";

export function executeRover(): void {
  clear(false);
  print("--------------------------");
  print(
    `| Rover (id: ${
      commander.roverTeam[commander.roverTeam.length - 1].id
    }) has been dispatched! |`
  );
  print("--------------------------");
  dialog(`Please send an action order (inc. 'L','R','M') for it: `, moveRover);
}

export function checkMoveInst(actions: Action[]): boolean {
  return (
    actions.filter((action) => !["L", "R", "M"].includes(action)).length === 0
  );
}

function moveRover(instruction: string): void {
  clear(true);
  let response = "";
  if (instruction && instruction.length > 0) {
    const actions = [...instruction] as Action[];
    if (checkMoveInst(actions)) {
      clear(false);
      const rover = commander.roverTeam[commander.roverTeam.length - 1];
      const state = rover.action(actions);
      const states: string[] = [
        `Done. I'm at (${rover.position.x}, ${rover.position.y}), face to ${rover.orientation}`,
        `The next position is occupied. I'm at (${rover.position.x}, ${rover.position.y}), face to ${rover.orientation}`,
        `The next position is out of map. I'm at (${rover.position.x}, ${rover.position.y}), face to ${rover.orientation}`,
      ];

      response = states[state];
      return chooseInstruction(response);
    } else {
      response = `Operation failed. Instruction should be series of actions within ["L", "R", "M"].`;
      return chooseInstruction(response);
    }
  } else {
    response = `Operation failed. Instruction is empty.`;
    return chooseInstruction(response);
  }
}
