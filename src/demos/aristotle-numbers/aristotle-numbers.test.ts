import { findFirstSolution } from "test-helpers";
import { range, sum } from "utils";
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

const makeMap = (internalRows: InternalRow[]): Map<number, number> => {
  const map = new Map<number, number>();

  for (const internalRow of internalRows) {
    for (const index of range(internalRow.run.cellIds.length)) {
      const cellId = internalRow.run.cellIds[index];
      const value = internalRow.values[index];
      console.assert(!map.has(cellId));
      map.set(cellId, value);
    }
  }

  return map;
};

const checkRuns = (internalRows: InternalRow[]): void => {
  const getInternalRowsOfRunType = (runType: RunType): InternalRow[] =>
    internalRows.filter((internalRow) => internalRow.run.runType === runType);

  const horizontalRows = getInternalRowsOfRunType(RunType.Horizontal);
  const diagonal1Rows = getInternalRowsOfRunType(RunType.Diagonal1);
  const diagonal2Rows = getInternalRowsOfRunType(RunType.Diagonal2);

  expect(horizontalRows).toHaveLength(5);
  expect(diagonal1Rows).toHaveLength(5);
  expect(diagonal2Rows).toHaveLength(5);

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

  checkValues(horizontalRows);
  checkValues(diagonal1Rows);
  checkValues(diagonal2Rows);

  const horizontalMap = makeMap(horizontalRows);
  const diagonal1Map = makeMap(diagonal1Rows);
  const diagonal2Map = makeMap(diagonal2Rows);

  for (const cellId of range(19)) {
    expect(horizontalMap.has(cellId)).toBe(true);
    expect(diagonal1Map.has(cellId)).toBe(true);
    expect(diagonal2Map.has(cellId)).toBe(true);

    const horizontalValue = horizontalMap.get(cellId);
    const diagonal1Value = diagonal1Map.get(cellId);
    const diagonal2Value = diagonal2Map.get(cellId);

    expect(diagonal1Value).toBe(horizontalValue);
    expect(diagonal2Value).toBe(horizontalValue);
  }
};

const checkRunSums = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    expect(sum(internalRow.values)).toBe(38);
  }
};

const checkValues = (internalRows: InternalRow[]): void => {
  const values = internalRows.flatMap((internalRow) => internalRow.values);
  const setOfValues = new Set(values);

  expect(setOfValues.size).toBe(19);

  for (const index of range(19)) {
    const value = index + 1;
    expect(setOfValues).toContain(value);
  }
};
