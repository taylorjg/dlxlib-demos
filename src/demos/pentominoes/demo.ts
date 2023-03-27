import { EmptyPuzzle, IDemo } from "types";
import { range } from "utils";
import { InternalRow } from "./internal-row";
import { piecesWithVariations } from "./pieces-with-variations";

export class Demo implements IDemo<EmptyPuzzle, InternalRow> {
  buildInternalRows(
    _puzzle: EmptyPuzzle,
    _checkForCancellation: () => boolean
  ): InternalRow[] {
    return this.allPossiblePiecePlacements().filter((internalRow) =>
      this.isValidPiecePlacement(internalRow)
    );
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const pieceColumns = this.makePieceColumns(internalRow);
    const locationColumns = this.makeLocationColumns(internalRow);
    return pieceColumns.concat(locationColumns);
  }

  getNumPrimaryColumns(_puzzle: EmptyPuzzle): number | undefined {
    return undefined;
  }

  allLocations = range(8).flatMap((row) =>
    range(8).map((col) => ({ row, col }))
  );

  isValidPiecePlacement(internalRow: InternalRow): boolean {
    for (const coords of internalRow.variation.coordsList) {
      const row = internalRow.location.row + coords.row;
      const col = internalRow.location.col + coords.col;
      if (row >= 8 || col >= 8) return false;
      if ((row === 3 || row === 4) && (col === 3 || col === 4)) return false;
    }
    return true;
  }

  allPossiblePiecePlacements(): InternalRow[] {
    const internalRows: InternalRow[] = [];
    const fixedPieceLabels = piecesWithVariations
      .slice(0, 1)
      .map(({ label }) => label);

    for (const pieceWithVariations of piecesWithVariations) {
      const variations = fixedPieceLabels.includes(pieceWithVariations.label)
        ? pieceWithVariations.variations.slice(0, 1)
        : pieceWithVariations.variations;

      for (const variation of variations) {
        for (const location of this.allLocations) {
          const label = pieceWithVariations.label;
          const internalRow = { label, variation, location };
          internalRows.push(internalRow);
        }
      }
    }

    return internalRows;
  }

  makePieceColumns(internalRow: InternalRow): number[] {
    const columns = Array(piecesWithVariations.length).fill(0);
    const pieceIndex = piecesWithVariations.findIndex(
      (pwv) => pwv.label === internalRow.label
    );
    columns[pieceIndex] = 1;
    return columns;
  }

  makeLocationColumns(internalRow: InternalRow): number[] {
    const indices = internalRow.variation.coordsList.map((coords) => {
      const row = internalRow.location.row + coords.row;
      const col = internalRow.location.col + coords.col;
      return row * 8 + col;
    });

    const columns = Array(8 * 8).fill(0);

    for (const index of indices) {
      columns[index] = 1;
    }

    const indicesToExclude = [3 * 8 + 3, 3 * 8 + 4, 4 * 8 + 3, 4 * 8 + 4];

    return columns.filter((_, index) => !indicesToExclude.includes(index));
  }
}
