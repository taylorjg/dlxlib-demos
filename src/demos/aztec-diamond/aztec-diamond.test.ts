import { findFirstSolution } from "test-helpers";
import { distinct } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { makeThumbnailSolution } from "./thumbnail";
import { addCoords } from "types";

describe("aztec-diamond tests", () => {
  it("can find a valid solution", () => {
    const demo = new Demo();
    const puzzle = {};
    const solutionInternalRows = findFirstSolution(demo, puzzle);
    checkSolution(solutionInternalRows);
  });

  it("has a valid thumbnail solution", () => {
    const { solutionInternalRows } = makeThumbnailSolution();
    checkSolution(solutionInternalRows);
  });
});

const checkSolution = (internalRows: InternalRow[]): void => {
  expect(internalRows).toHaveLength(25);
  checkAllPiecesCovered(internalRows);
  checkAllHorizontalsCovered(internalRows);
  checkAllVertialsCovered(internalRows);
  checkNoOverlappingJunctions(internalRows);
};

const checkAllPiecesCovered = (internalRows: InternalRow[]): void => {
  const allLabelsWithReflectedFlag = internalRows.map(
    (internalRow) => `${internalRow.label}:${internalRow.variation.reflected}`
  );
  expect(distinct(allLabelsWithReflectedFlag)).toHaveLength(25);
};

const checkAllHorizontalsCovered = (internalRows: InternalRow[]): void => {
  const allHorizontals = internalRows
    .flatMap((internalRow) =>
      internalRow.variation.horizontals.map((coords) =>
        addCoords(internalRow.location, coords)
      )
    )
    .map(({ row, col }) => `${row}:${col}`);

  expect(distinct(allHorizontals)).toHaveLength(50);
};

const checkAllVertialsCovered = (internalRows: InternalRow[]): void => {
  const allVerticals = internalRows
    .flatMap((internalRow) =>
      internalRow.variation.verticals.map((coords) =>
        addCoords(internalRow.location, coords)
      )
    )
    .map(({ row, col }) => `${row}:${col}`);

  expect(distinct(allVerticals)).toHaveLength(50);
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
