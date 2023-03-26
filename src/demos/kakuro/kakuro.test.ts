import { findFirstSolution } from "test-helpers";
import { first, sum } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { puzzles } from "./puzzles";
import { makeThumbnailSolution } from "./thumbnail";

describe("kakuro tests", () => {
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
  const { horizontalRuns, verticalRuns } = puzzle;
  const totalRunCount = horizontalRuns.length + verticalRuns.length;
  expect(internalRows).toHaveLength(totalRunCount);
  checkDigits(internalRows);
  checkRuns(puzzle, internalRows);
  checkRunSums(internalRows);
};

const checkDigits = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    for (const value of internalRow.values) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(9);
    }
  }
};

const checkRuns = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  for (const horizontalRun of puzzle.horizontalRuns) {
    const internalRow = internalRows.find(({ run }) => run === horizontalRun);
    expect(internalRow).toBeDefined();
  }

  for (const verticalRun of puzzle.verticalRuns) {
    const internalRow = internalRows.find(({ run }) => run === verticalRun);
    expect(internalRow).toBeDefined();
  }
};

const checkRunSums = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    expect(sum(internalRow.values)).toBe(internalRow.run.sum);
  }
};
