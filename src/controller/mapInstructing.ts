import { clear, print, dialog } from "../../console";
import { endAdventure, commander } from "../..";
import { Plateau } from "../model/Plateau";
import { createRover } from "./roverInstructing";

function checkInstruction(x: number, y: number): boolean {
  return Number.isInteger(x) && Number.isInteger(y) && x > 0 && y > 0;
}

export function createMap(): void {
  clear(false);
  print("--------------------------");
  print("| Spaceship has landed on the Mars! |");
  print("--------------------------");
  dialog(`Please initializing the map (e.g. '5 5', max is 100): `, initialMap);
}

function initialMap(coordinates: string): void {
  if (coordinates && coordinates.length > 0) {
    const x = +coordinates.split(" ")[0];
    const y = +coordinates.split(" ")[1];
    if (checkInstruction(x, y)) {
      //const commander = new Commander();
      const plateau: Plateau = new Plateau(x, y);
      commander.setMap(plateau);
      return createRover();
    } else {
      print("***************************************");
      print(
        `Map initialization failed. Instruction ${coordinates} is illegal. They should be two numbers.`
      );
      return endAdventure();
    }
  } else {
    print(`Map initialization failed. Instruction is empty.`);
    return endAdventure();
  }
}
