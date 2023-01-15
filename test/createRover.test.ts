import { commander } from "..";
import { checkInitialInst } from "../src/controller/createRover";

describe("test checkInstruction if x and y are valid input", () => {
  commander.plateau = { x: 5, y: 5 };
  it("x,y > 0 && < commander.plateau && ori is in (N,W,S,E), should return true", () => {
    expect(checkInitialInst(3, 3, "N")).toBe(true);
    expect(checkInitialInst(1, 4, "S")).toBe(true);
  });
  it("x,y < 0 || > commander.plateau || ori is not in (N,W,S,E), should return false", () => {
    expect(checkInitialInst(7, 3, "N")).toBe(false);
    expect(checkInitialInst(-2, 3, "N")).toBe(false);
    expect(checkInitialInst(3, 3.5, "N")).toBe(false);
    expect(checkInitialInst(3, 3, "G")).toBe(false);
  });
});
