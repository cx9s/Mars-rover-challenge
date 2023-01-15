import { checkInstruction } from "../src/controller/createMap";
describe("test checkInstruction if x and y are valid input", () => {
  it("both >0 && is integer should return true", () => {
    expect(checkInstruction(10, 5)).toBe(true);
  });
  it("!>0 || is not integer should return false", () => {
    expect(checkInstruction(10.5, 5)).toBe(false);
    expect(checkInstruction(0, 5)).toBe(false);
    expect(checkInstruction(5, -5)).toBe(false);
  });
});
