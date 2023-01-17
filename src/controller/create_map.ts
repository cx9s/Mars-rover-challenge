import { clear, print, dialog } from "../../console";
import { commander } from "../..";
import { Plateau } from "../model/Plateau";
import { chooseInstruction } from "./choose_instruction";

export function checkInstruction(x: number, y: number): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x > 0 && y > 0;
}

// dialog for creating a map
export function createMap(): void {
  clear(false);
  print("--------------------------");
  print(`| Captain ${commander.captain}! |`);
  print("--------------------------");
  dialog(
    `Please initializing the map (e.g. '5 5', range is from 1 to 100): `,
    initialMap
  );
}

// initial a map
function initialMap(coordinates: string): void {
  clear(true);
  let response = "";
  if (coordinates && coordinates.length > 0) {
    const x = +coordinates.split(" ")[0];
    const y = +coordinates.split(" ")[1];
    if (checkInstruction(x, y)) {
      const plateau: Plateau = new Plateau(x, y);
      commander.setMap(plateau);
      commander.roverTeam = [];
      response = `| Map (${commander.plateau.x}x${commander.plateau.y}) has been initialized! No Rover in it. |`;
      return chooseInstruction(response);
    } else {
      response = `Map initialization failed. Instruction "${coordinates}" is illegal. They should be two numbers from 1 to 100.`;
      return chooseInstruction(response);
    }
  } else {
    response = `Map initialization failed. Instruction is empty.`;
    return chooseInstruction(response);
  }
}
