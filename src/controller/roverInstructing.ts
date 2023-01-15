import { clear, print, dialog } from "../../console";
import { endAdventure, commander } from "../..";
import { Rover } from "../model/Rover";
import { Orientation } from "../model/Orientation";
import { Action } from "../model/Instruction";

function checkInitialInst(x: number, y: number, ori: string): boolean {
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
  const x = +instruction.split(" ")[0];
  const y = +instruction.split(" ")[1];
  const ori = instruction.split(" ")[2] as Orientation;
  if (checkInitialInst(x, y, ori)) {
    const rover = new Rover({ x: x, y: y }, ori);
    commander.dispatch(rover);
    return executeRover();
  } else {
    print("***************************************");
    print(
      `Dispatch failed. Instruction should be tow coordinates within (${commander.plateau.x}, ${commander.plateau.y}) and one orientation of ["N", "E", "S", "W"].`
    );
    return endAdventure();
  }
}

export function executeRover(): void {
  clear(false);
  print("--------------------------");
  print(
    `| Rover (id: ${
      commander.roverTeam[commander.roverTeam.length - 1].id
    }) has been dispatched! |`
  );
  print("--------------------------");
  dialog(`Please send a action order (inc. 'L','R','M') for it: `, moveRover);
}

function checkMoveInst(actions: Action[]): boolean {
  return (
    actions.filter((action) => !["L", "R", "M"].includes(action)).length === 0
  );
}

function moveRover(instruction: string): void {
  const actions = [...instruction] as Action[];
  if (checkMoveInst(actions)) {
    commander.roverTeam[commander.roverTeam.length - 1].action(actions);
    //return executeRover();
  } else {
    print("***************************************");
    print(
      `Operation failed. Instruction should be series of actions within ["L", "R", "M"].`
    );
    return endAdventure();
  }
}
