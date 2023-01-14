import { Plateau, createPlateau } from "./src/model/Plateau";
import { Commander } from "./src/model/Commander";
import { Rover } from "./src/model/Rover";
import { PlateauInst, RoverInitInst, Action } from "./src/model/Instruction";

// map and rover instructions
const ins_initMap: PlateauInst = { x: 10, y: 10 };
const ins_initRover: RoverInitInst = {
  position: { x: 1, y: 2 },
  orientation: "N",
};
// action instruction
// const ins_moveRover: Action[] = ["L", "M"];
const ins_moveRover: Action[] = ["L", "M", "L", "M", "L", "M", "L", "M", "M"];

// initial map & rover
const plateau: Plateau = createPlateau(ins_initMap.x, ins_initMap.y);

const rover1: Rover = new Rover(
  { x: ins_initRover.position.x, y: ins_initRover.position.y },
  ins_initRover.orientation
);
const rover2: Rover = new Rover({ x: 1, y: 2 }, "S");

// initial commander
const commander: Commander = new Commander();
commander.dispatch(rover1);
commander.dispatch(rover2);
//commander.recall(rover1);

console.log(`plateau (${plateau.x},${plateau.y}) has been initialized.`);

console.log(
  `rover (id: ${rover1.id}) has been created at (${rover1.position.x},${rover1.position.y}), and face to ${rover1.orientation}`
);

console.log(`commander has ${commander.roverTeam.length}`);

rover1.action(commander, ins_moveRover);

console.log(commander.roverTeam[0].position);
