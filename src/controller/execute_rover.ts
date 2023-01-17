import { clear, print, dialog } from "../../console";
import { commander } from "../..";
import { Action } from "../model/Instruction";
import { chooseInstruction } from "./choose_instruction";

// dialog for instruting a rover
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

// rover actions processor
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
