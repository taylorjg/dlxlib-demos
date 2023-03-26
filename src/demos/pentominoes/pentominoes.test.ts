import { findFirstSolution } from "test-helpers";
import { distinct } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { makeThumbnailSolution } from "./thumbnail";
import { addCoords } from "types";

describe("pentominoes tests", () => {
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
  expect(internalRows).toHaveLength(12);
  checkAllPiecesCovered(internalRows);
  checkAllSquaresCovered(internalRows);
};

const checkAllPiecesCovered = (internalRows: InternalRow[]): void => {
  const allLabels = internalRows.map((internalRow) => internalRow.label);
  expect(distinct(allLabels)).toHaveLength(12);
};

const checkAllSquaresCovered = (internalRows: InternalRow[]): void => {
  const allSquares = internalRows
    .flatMap((internalRow) =>
      internalRow.variation.coordsList.map((coords) =>
        addCoords(internalRow.location, coords)
      )
    )
    .map(({ row, col }) => `${row}:${col}`);

  const reservedSquares = [
    { row: 3, col: 3 },
    { row: 3, col: 4 },
    { row: 4, col: 3 },
    { row: 4, col: 4 },
  ].map(({ row, col }) => `${row}:${col}`);

  expect(distinct(allSquares.concat(reservedSquares))).toHaveLength(64);
};
