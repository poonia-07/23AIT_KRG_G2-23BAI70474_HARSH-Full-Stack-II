import { add , subtract } from "./mathematicalFunctions";

describe('Mathematical Functions', () => {
  test('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('should subtract two numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});