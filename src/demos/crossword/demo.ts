import { Coords, IDemo, sameCoords } from "types";
import { range } from "utils";
import { ClueType } from "./clue-type";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";

export class Demo implements IDemo<Puzzle, InternalRow> {
  buildInternalRows(
    puzzle: Puzzle,
    _checkForCancellation: () => boolean
  ): InternalRow[] {
    const internalRows: InternalRow[] = [];

    for (const clue of puzzle.clues) {
      for (const candidate of clue.candidates) {
        const internalRow = { puzzle, clue, candidate };
        internalRows.push(internalRow);
      }
    }

    return internalRows;
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    return this.makeColumns(internalRow);
  }

  getNumPrimaryColumns(_puzzle: Puzzle): number | undefined {
    return undefined;
  }

  makeColumns(internalRow: InternalRow): number[] {
    const crossCheckingSquares = internalRow.puzzle.crossCheckingSquares;
    const clue = internalRow.clue;
    const columns = Array(crossCheckingSquares.length * 26).fill(0);

    const findCrossCheckingSquareIndex = (coords: Coords): number => {
      return crossCheckingSquares.findIndex((crossCheckingSquare) =>
        sameCoords(crossCheckingSquare, coords)
      );
    };

    for (const index of range(clue.coordsList.length)) {
      const coords = clue.coordsList[index];
      const crossCheckingSquareIndex = findCrossCheckingSquareIndex(coords);
      if (crossCheckingSquareIndex >= 0) {
        const letter = internalRow.candidate[index];
        const encodedLetterColumns = this.encodeLetter(letter, clue.clueType);
        const baseIndex = crossCheckingSquareIndex * 26;
        for (const encodedLetterIndex of range(encodedLetterColumns.length)) {
          columns[baseIndex + encodedLetterIndex] =
            encodedLetterColumns[encodedLetterIndex];
        }
      }
    }

    return columns;
  }

  encodeLetter(letter: string, clueType: ClueType): number[] {
    const upperLetter = letter.toLocaleUpperCase();
    const index = upperLetter.codePointAt(0)! - "A".codePointAt(0)!;
    const [onValue, offValue] = clueType === ClueType.Across ? [1, 0] : [0, 1];
    const columns = Array(26).fill(offValue);
    columns[index] = onValue;
    return columns;
  }
}
