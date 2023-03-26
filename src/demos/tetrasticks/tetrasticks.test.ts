import { findFirstSolution } from "test-helpers";
import { distinct, first } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { makeThumbnailSolution } from "./thumbnail";
import { puzzles } from "./puzzles";
import { addCoords } from "types";

describe("tetrasticks tests", () => {
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
  expect(internalRows).toHaveLength(15);
  checkAllPiecesCovered(internalRows);
  checkAllHorizontalsCovered(internalRows);
  checkAllVertialsCovered(internalRows);
  checkNoOverlappingJunctions(internalRows);
};

const checkAllPiecesCovered = (internalRows: InternalRow[]): void => {
  const allLabels = internalRows.map((internalRow) => internalRow.label);
  expect(distinct(allLabels)).toHaveLength(15);
};

const checkAllHorizontalsCovered = (internalRows: InternalRow[]): void => {
  const allHorizontals = internalRows
    .flatMap((internalRow) =>
      internalRow.variation.horizontals.map((coords) =>
        addCoords(internalRow.location, coords)
      )
    )
    .map(({ row, col }) => `${row}:${col}`);

  expect(distinct(allHorizontals)).toHaveLength(30);
};

const checkAllVertialsCovered = (internalRows: InternalRow[]): void => {
  const allVerticals = internalRows
    .flatMap((internalRow) =>
      internalRow.variation.verticals.map((coords) =>
        addCoords(internalRow.location, coords)
      )
    )
    .map(({ row, col }) => `${row}:${col}`);

  expect(distinct(allVerticals)).toHaveLength(30);
};

const checkNoOverlappingJunctions = (internalRows: InternalRow[]): void => {
  const allJunctions = internalRows
    .flatMap((internalRow) =>
      internalRow.variation.junctions.map((coords) =>
        addCoords(internalRow.location, coords)
      )
    )
    .map(({ row, col }) => `${row}:${col}`);

  expect(distinct(allJunctions)).toHaveLength(allJunctions.length);
};
