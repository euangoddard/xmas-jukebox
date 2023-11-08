import { describe, it, expect } from "vitest";
import { checkClueAnswer } from "./clue-check";

describe(checkClueAnswer.name, () => {
  it("should handle an empty answer", () => {
    expect(checkClueAnswer({ id: "1", answer: "test" }, "")).toBe(false);
  });

  it("should handle an empty clue answer", () => {
    expect(checkClueAnswer({ id: "1", answer: "" }, "test")).toBe(false);
  });

  it("should return true when the answers are identical", () => {
    expect(checkClueAnswer({ id: "1", answer: "test" }, "test")).toBe(true);
  });

  it("should return true when the answers differ by less than 3", () => {
    expect(checkClueAnswer({ id: "1", answer: "te" }, "test")).toBe(true);
  });

  it("should return false when the answers differ by 3", () => {
    expect(checkClueAnswer({ id: "1", answer: "t" }, "test")).toBe(false);
  });

  it("should return false when the answers differ by more than 3", () => {
    expect(checkClueAnswer({ id: "1", answer: "t" }, "tests")).toBe(false);
  });

  describe("stop words", () => {
    it('should remove "the" from the clue answer', () => {
      expect(checkClueAnswer({ id: "1", answer: "the test" }, "test")).toBe(
        true
      );
    });

    it('should remove "the" from the answer', () => {
      expect(checkClueAnswer({ id: "1", answer: "test" }, "test the")).toBe(
        true
      );
    });
  });

  describe("synonyms", () => {
    it.each([
      ["+", "and"],
      ["&", "and"],
      ["1", "one"],
      ["2", "two"],
      ["3", "three"],
      ["4", "four"],
      ["5", "five"],
      ["6", "six"],
      ["7", "seven"],
      ["8", "eight"],
      ["9", "nine"],
      ["xmas", "christmas"],
    ])("should alias %s to %s", (input: string, alias: string) => {
      expect(checkClueAnswer({ id: "1", answer: input }, alias)).toBe(true);
    });
  });
});
