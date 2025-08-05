import { findFirstSolution } from "test-helpers";
import { sum } from "utils";
import { Demo, horizontalRuns, diagonal1Runs, diagonal2Runs } from "./demo";
import { InternalRow } from "./internal-row";
import { makeThumbnailSolution } from "./thumbnail";
import { RunType } from "./run-type";

describe("aristotle-numbers tests", () => {
  it("can find a valid solution", () => {
    const puzzle = {};
    const demo = new Demo();
    const solutionInternalRows = findFirstSolution(demo, puzzle);
    checkSolution(solutionInternalRows);
  });

  it("has a valid thumbnail solution", () => {
    const solutionInternalRows = makeThumbnailSolution();
    checkSolution(solutionInternalRows);
  });
});

const checkSolution = (internalRows: InternalRow[]): void => {
  const totalRunCount =
    horizontalRuns.length + diagonal1Runs.length + diagonal2Runs.length;
  expect(internalRows).toHaveLength(totalRunCount);
  checkDigits(internalRows);
  checkRuns(internalRows);
  checkRunSums(internalRows);
};

const checkDigits = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    for (const value of internalRow.values) {
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(19);
    }
  }
};

const checkRuns = (internalRows: InternalRow[]): void => {
  const getInternalRowsOfRunType = (runType: RunType): InternalRow[] =>
    internalRows.filter((internalRow) => internalRow.run.runType === runType);

  expect(getInternalRowsOfRunType(RunType.Horizontal)).toHaveLength(5);
  expect(getInternalRowsOfRunType(RunType.Diagonal1)).toHaveLength(5);
  expect(getInternalRowsOfRunType(RunType.Diagonal2)).toHaveLength(5);

  const internalRowRuns = internalRows.map(({ run }) => run);

  for (const run of horizontalRuns) {
    expect(internalRowRuns).toContain(run);
  }

  for (const run of diagonal1Runs) {
    expect(internalRowRuns).toContain(run);
  }

  for (const run of diagonal2Runs) {
    expect(internalRowRuns).toContain(run);
  }

  const values = internalRows.flatMap((internalRow) => internalRow.values);
  const valuesAsASet = new Set(values);
  expect(valuesAsASet.size).toBe(19);

  // TODO: check that the values are in the same locations for horizontal, diagonal1 and diagonal2 solution rows
  // horizontal: cellId 0 = v1, cellId 1 = v2, cellId 2 = v3, etc.
  // diagonal1: cellId 0 = v1, cellId 1 = v2, cellId 2 = v3, etc.
  // diagonal2: cellId 0 = v1, cellId 1 = v2, cellId 2 = v3, etc.
};

const checkRunSums = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    expect(sum(internalRow.values)).toBe(38);
  }
};
