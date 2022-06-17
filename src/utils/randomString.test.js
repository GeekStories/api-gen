import randomString from "./randomString";

describe("generate a random string with a given length", () => {
  test("given 3 it should return a string with 3 characters", () => {
    const length = 3;
    const result = randomString(length);
    expect(result.length).toBe(length);
  });

  test("given -5 it should return an empty string", () => {
    const length = -5;
    const result = randomString(length);
    expect(result.length).toBe(0);
  });
});
