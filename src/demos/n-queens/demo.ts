import { IDemo } from "types";
import { range } from "utils";
import { Puzzle } from "./puzzle";
import { InternalRow } from "./internal-row";

export class Demo implements IDemo<Puzzle, InternalRow> {
  buildInternalRows(
    puzzle: Puzzle,
    checkForCancellation: () => boolean
  ): InternalRow[] {
    const allLocations = range(puzzle.size).flatMap((row) =>
      range(puzzle.size).map((col) => ({ row, col }))
    );
    return allLocations.map((coords) => ({ puzzle, coords }));
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    return puzzle.size * 2;
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const { row, col } = internalRow.coords;
    const size = internalRow.puzzle.size;
    const diagonalColumnCount = size + size - 3;

    const rowColumns = Array(size).fill(0);
    const colColumns = Array(size).fill(0);
    const diagonal1Columns = Array(diagonalColumnCount).fill(0);
    const diagonal2Columns = Array(diagonalColumnCount).fill(0);

    rowColumns[row] = 1;
    colColumns[col] = 1;

    const diagonal1 = row + col - 1;
    if (diagonal1 >= 0 && diagonal1 < diagonalColumnCount)
      diagonal1Columns[diagonal1] = 1;

    const diagonal2 = size - 1 - col + row - 1;
    if (diagonal2 >= 0 && diagonal2 < diagonalColumnCount)
      diagonal2Columns[diagonal2] = 1;

    return rowColumns
      .concat(colColumns)
      .concat(diagonal1Columns)
      .concat(diagonal2Columns);
  }
}
