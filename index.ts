import { clear, print, dialog } from "./console";
import { createMap } from "./src/controller/mapInstructing";
import { Commander } from "./src/model/Commander";

export function marsExplore(): void {
  clear(false);
  print("--------------------------");
  print("| Spaceship is approaching the Mars! |");
  print("--------------------------");

  dialog(`Captain, please verify your name: `, landingMars); // 👉 FIXME ❌
}

function landingMars(name: string): void {
  if (name && name.length > 0) {
    commander.captain = name;
    return createMap();
  } else {
    print(`I don't know your name. You looks like a ghost.`);
    return endAdventure();
  }
}

export function endAdventure(): void {
  print("***************************************");
  print("We didn't explore the Mars successful.");
  dialog("Press ENTER to restart! ", marsExplore);
}

export const commander: Commander = new Commander();

marsExplore();
