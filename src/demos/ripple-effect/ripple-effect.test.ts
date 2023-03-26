import { findFirstSolution } from "test-helpers";
import { Coords, goDown, goLeft, goRight, goUp, sameCoords } from "types";
import { distinct, first, range } from "utils";
import { Demo } from "./demo";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { puzzles } from "./puzzles";
import { makeThumbnailSolution } from "./thumbnail";

describe("ripple-effect tests", () => {
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
  expect(internalRows).toHaveLength(puzzle.size * puzzle.size);
  checkAllSquaresCovered(puzzle, internalRows);
  checkProximityConstraints(internalRows);
  CheckRoomValues(puzzle, internalRows);
};

const checkAllSquaresCovered = (
  puzzle: Puzzle,
  internalRows: InternalRow[]
): void => {
  const allSquares = internalRows.map(({ cell }) => `${cell.row}:${cell.col}`);
  expect(distinct(allSquares)).toHaveLength(puzzle.size * puzzle.size);

  for (const internalRow of internalRows) {
    const { row, col } = internalRow.cell;
    expect(row).toBeGreaterThanOrEqual(0);
    expect(row).toBeLessThan(puzzle.size);
    expect(col).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(puzzle.size);
  }
};

const checkProximityConstraints = (internalRows: InternalRow[]): void => {
  const checkConstraint = (
    cell: Coords,
    value: number,
    advance: (coords: Coords) => Coords
  ): void => {
    let currentCell = cell;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in range(value)) {
      currentCell = advance(currentCell);
      const currentCellLocal = currentCell;
      const internalRow = internalRows.find(({ cell }) =>
        sameCoords(cell, currentCellLocal)
      );
      if (internalRow) {
        expect(internalRow.value).not.toBe(value);
      }
    }
  };

  for (const internalRow of internalRows) {
    checkConstraint(internalRow.cell, internalRow.value, goUp);
    checkConstraint(internalRow.cell, internalRow.value, goDown);
    checkConstraint(internalRow.cell, internalRow.value, goLeft);
    checkConstraint(internalRow.cell, internalRow.value, goRight);
  }
};

const CheckRoomValues = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const findValue = (cell: Coords): number => {
    for (const internalRow of internalRows) {
      if (sameCoords(internalRow.cell, cell)) return internalRow.value;
    }

    return 0;
  };

  for (const room of puzzle.rooms) {
    const roomSize = room.cells.length;
    const values: number[] = [];
    for (const cell of room.cells) {
      const value = findValue(cell);
      expect(value).toBeGreaterThanOrEqual(1);
      expect(value).toBeLessThanOrEqual(roomSize);
      values.push(value);
    }
    expect(distinct(values)).toHaveLength(roomSize);
  }
};
