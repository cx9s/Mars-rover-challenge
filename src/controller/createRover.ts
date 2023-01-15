import { clear, print, dialog } from "../../console";
import { errorHandle, commander } from "../..";
import { Rover } from "../model/Rover";
import { Orientation } from "../model/Orientation";
import { Action } from "../model/Instruction";
import { chooseInstruction } from "./chooseInstruction";

export function checkInitialInst(x: number, y: number, ori: string): boolean {
  let ret = true;

  if (!Number.isInteger(x) || !Number.isInteger(y)) ret = false;

  if (x <= 0 || y <= 0 || x > commander.plateau.x || y > commander.plateau.y)
    ret = false;

  if (!["N", "E", "S", "W"].includes(ori)) ret = false;

  return ret;
}

export function createRover(): void {
  clear(false);
  print("--------------------------");
  print(
    `| Map (${commander.plateau.x}x${commander.plateau.y}) has been initialized! |`
  );
  print("--------------------------");
  dialog(
    `Please dispatch a mars rover with a coordinates and orientation (e.g. '1 1 N'): `,
    initialRover
  );
}

function initialRover(instruction: string): void {
  clear(true);
  let response = "";
  const x = +instruction.split(" ")[0];
  const y = +instruction.split(" ")[1];
  const ori = instruction.split(" ")[2] as Orientation;
  if (checkInitialInst(x, y, ori)) {
    if (!commander.checkPosition({ x: x, y: y })) {
      const rover = new Rover({ x: x, y: y }, ori);
      commander.dispatch(rover);
      response = `| Rover (id: ${
        commander.roverTeam[commander.roverTeam.length - 1].id
      }) has been dispatched at (${x}, ${y}). |`;
      return chooseInstruction(response);
    } else {
      response = `Dispatch failed. (${x}, ${y}) has been occupied by another rover.`;
      return chooseInstruction(response);
    }
  } else {
    response = `Dispatch failed. Instruction should be tow coordinates within (${commander.plateau.x}, ${commander.plateau.y}) and one orientation of ["N", "E", "S", "W"].`;
    return chooseInstruction(response);
  }
}
