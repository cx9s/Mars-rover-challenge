import { clear, print, dialog } from "../../console";
import { commander, marsExplore } from "../..";
import { createMap } from "./create_map";
import { createRover } from "./create_rover";
import { executeRover } from "./execute_rover";

function endMarsExplore(): void {
  commander.reset();
  clear(false);
  print("***************************************");
  print("Mars exploration has completed.");
  dialog("Press ENTER to restart! ", marsExplore);
}

const instructions = [
  createMap,
  createRover,
  executeRover,
  endMarsExplore,
] as const;
type Instruction = typeof instructions[number];
const descriptions = [
  "create/re-creat a map",
  "dispatch a rover",
  "execute a rover",
  "end mars exploration",
] as const;
type Description = typeof descriptions[number];

// list all instructions
export function chooseInstruction(response?: string): void {
  clear(false);
  print("------------------------");
  // print(`| Captain ${commander.captain}! |`);
  print(`${response}`);
  print("------------------------");
  print(" please choose a instruction from below: ");
  descriptions.forEach((h, i) => print(`   ${i} - ${h}`));
  dialog("Which code number will you choose?", showInstruction);
}
// choose an instruction, code processor
export function showInstruction(num: string): void {
  clear(true);
  const number = parseInt(num);

  if (isNaN(number)) {
    return chooseInstruction(`Choose failed. It should be a number code.`);
  }

  if (number < 0 || number > instructions.length - 1) {
    return chooseInstruction(`Choose failed. ${number} is an invalid code.`);
  }

  if (
    number === descriptions.indexOf("dispatch a rover") &&
    commander.plateau.x === 0
  ) {
    return chooseInstruction(`Please create a map first.`);
  }

  if (
    number === descriptions.indexOf("execute a rover") &&
    commander.roverTeam.length === 0
  ) {
    return chooseInstruction(`Please create a rover first.`);
  }

  return instructions[number]();
}
