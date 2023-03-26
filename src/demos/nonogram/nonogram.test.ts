import { findFirstSolution } from "test-helpers";
import { first, last } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { makeThumbnailSolution } from "./thumbnail";
import { puzzles } from "./puzzles";
import { RunGroupType } from "./run-group-type";

describe("nonogram tests", () => {
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
  const { horizontalRunGroups, verticalRunGroups } = puzzle;
  const totalRunGroupsCount =
    horizontalRunGroups.length + verticalRunGroups.length;
  expect(internalRows).toHaveLength(totalRunGroupsCount);
  checkAllRunGroupsArePresent(puzzle, internalRows);
  checkHorizontalRunGroupsAreCorrect(puzzle, internalRows);
  checkVerticalRunGroupsAreCorrect(puzzle, internalRows);
};

const checkAllRunGroupsArePresent = (
  puzzle: Puzzle,
  internalRows: InternalRow[]
): void => {
  for (const horizontalRunGroup of puzzle.horizontalRunGroups) {
    const internalRow = internalRows.find(
      ({ runGroup }) => runGroup === horizontalRunGroup
    );
    expect(internalRow).toBeDefined();
  }

  for (const verticalRunGroup of puzzle.verticalRunGroups) {
    const internalRow = internalRows.find(
      ({ runGroup }) => runGroup === verticalRunGroup
    );
    expect(internalRow).toBeDefined();
  }
};

const checkHorizontalRunGroupsAreCorrect = (
  puzzle: Puzzle,
  internalRows: InternalRow[]
): void => {
  const colsToRunGroupLengths = (cols: number[]): number[] => {
    const runGroupLengths: number[] = [];
    const currentRun: number[] = [];

    for (const col of cols) {
      if (currentRun.length === 0) {
        currentRun.push(col);
      } else {
        if (col === last(currentRun) + 1) {
          currentRun.push(col);
        } else {
          runGroupLengths.push(currentRun.length);
          currentRun.splice(0);
          currentRun.push(col);
        }
      }
    }

    if (currentRun.length > 0) runGroupLengths.push(currentRun.length);

    return runGroupLengths;
  };

  const rebuildHorizontalRunGroupLengths = (row: number): number[] => {
    const cols = internalRows
      .filter(({ runGroup }) => runGroup.runGroupType === RunGroupType.Vertical)
      .flatMap((internalRow) =>
        internalRow.coordsLists.flatMap((coordsList) =>
          coordsList.filter((coords) => coords.row === row)
        )
      )
      .map((coords) => coords.col);

    return colsToRunGroupLengths(cols);
  };

  for (const horizontalRunGroup of puzzle.horizontalRunGroups) {
    const runGroupLengths = rebuildHorizontalRunGroupLengths(
      horizontalRunGroup.row
    );
    expect(horizontalRunGroup.lengths).toEqual(runGroupLengths);
  }
};

const checkVerticalRunGroupsAreCorrect = (
  puzzle: Puzzle,
  internalRows: InternalRow[]
): void => {
  const rowsToRunGroupLengths = (rows: number[]): number[] => {
    const runGroupLengths: number[] = [];
    const currentRun: number[] = [];

    for (const row of rows) {
      if (currentRun.length === 0) {
        currentRun.push(row);
      } else {
        if (row === last(currentRun) + 1) {
          currentRun.push(row);
        } else {
          runGroupLengths.push(currentRun.length);
          currentRun.splice(0);
          currentRun.push(row);
        }
      }
    }

    if (currentRun.length > 0) runGroupLengths.push(currentRun.length);

    return runGroupLengths;
  };

  const rebuildVerticalRunGroupLengths = (col: number): number[] => {
    const rows = internalRows
      .filter(
        ({ runGroup }) => runGroup.runGroupType === RunGroupType.Horizontal
      )
      .flatMap((internalRow) =>
        internalRow.coordsLists.flatMap((coordsList) =>
          coordsList.filter((coords) => coords.col === col)
        )
      )
      .map((coords) => coords.row);

    return rowsToRunGroupLengths(rows);
  };

  for (const verticalRunGroup of puzzle.verticalRunGroups) {
    const runGroupLengths = rebuildVerticalRunGroupLengths(
      verticalRunGroup.col
    );
    expect(verticalRunGroup.lengths).toEqual(runGroupLengths);
  }
};
