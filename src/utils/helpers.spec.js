const { test, expect } = require("@jest/globals");
const { generateRandomCharacters } = require("./helpers");

describe("Helper Utility Tests", () => {
  test("generateRandomCharacters test", () => {
    expect(generateRandomCharacters).toBeDefined();
    expect(() => generateRandomCharacters()).not.toThrowError();

    expect(
      generateRandomCharacters(6, {
        lowercase: true,
        splitBy: "-",
        splitInterval: "3",
      })
    ).toMatch(/^[A-Z0-9]+$/gi);
  });
});
