import { findFirstSolution } from "test-helpers";
import { first } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { makeThumbnailSolution } from "./thumbnail";
import { puzzles } from "./puzzles";

describe("crossword tests", () => {
  it("can find a valid solution", () => {
    const demo = new Demo();
    const puzzle = first(puzzles);
    const solutionInternalRows = findFirstSolution(demo, puzzle);
    checkSolution(puzzle, solutionInternalRows);
  });

  it("has a valid thumbnail solution", () => {
    const { puzzle, solutionInternalRows } = makeThumbnailSolution();
    checkSolution(puzzle, solutionInternalRows);
  });
});

const checkSolution = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const puzzleClueNumbers = puzzle.clues.map((clue) => clue.clueNumber);
  const solutionClueNumbers = internalRows.map(
    (internalRow) => internalRow.clue.clueNumber
  );
  expect(solutionClueNumbers).toEqual(puzzleClueNumbers);
  checkAnswers(puzzle, internalRows);
};

const checkAnswers = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    expect(internalRow.candidate).toBe(first(internalRow.clue.candidates));
  }
};
