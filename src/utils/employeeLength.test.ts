import { employeeLength } from "./employeeLength";

test("should return true if array length is bigger than 0 or false otherwise", () => {
  expect(employeeLength([])).toBe(false);
  expect(employeeLength(["Richard", "amy", "alex"])).toBe(true);
  expect(employeeLength(["mike"])).toBe(true);
});
