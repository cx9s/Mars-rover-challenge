import { clear, print, dialog } from "./console";
import { chooseInstruction } from "./src/controller/chooseInstruction";
import { Commander } from "./src/model/Commander";

// game entrance function
export function marsExplore(): void {
  clear(false);
  print("--------------------------");
  print("| Spaceship is approaching the Mars! |");
  print("--------------------------");
  dialog(`Captain, please verify your name: `, landingMars);
}

// captain name processor
function landingMars(name: string): void {
  if (name && name.length > 0) {
    commander.captain = name;
    return chooseInstruction(`Captain ${commander.captain}!`);
  } else {
    clear(true);
    print("***************************************");
    print(`I don't know your name. You looks like a ghost.`);
    return errorHandle(marsExplore);
  }
}

// error input processor
export function errorHandle(callback: (response?: string) => void): void {
  //   clear(false);
  print("***************************************");
  //   print("You enter a wrong instruction.");
  dialog("Press ENTER to re-enter! ", callback);
}

// center commander instantiation
export const commander: Commander = new Commander();
// game entrance
marsExplore();
