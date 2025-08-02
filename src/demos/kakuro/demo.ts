import { Coords, IDemo, sameCoords } from "types";
import { except, range, sum } from "utils";
import { InternalRow } from "./internal-row";
import { Run, sameRun } from "./run";
import { Puzzle } from "./puzzle";
import { RunType } from "./run-type";
import { doPermute } from "./permutations";

const DIGITS = range(9).map((n) => n + 1);

export class Demo implements IDemo<Puzzle, InternalRow> {
  buildInternalRows(
    puzzle: Puzzle,
    _checkForCancellation: () => boolean
  ): InternalRow[] {
    const internalRows: InternalRow[] = [];

    const createInternalRowsFor = (runs: Run[]): void => {
      for (const run of runs) {
        for (const setOfValues of this.findSetsOfValues(run)) {
          for (const values of doPermute(setOfValues)) {
            const internalRow = { puzzle, run, values };
            internalRows.push(internalRow);
          }
        }
      }
    };

    createInternalRowsFor(puzzle.horizontalRuns);
    createInternalRowsFor(puzzle.verticalRuns);

    return internalRows;
  }

  // Return sets of values where each set of values:
  // - has length run.CoordsList.Length
  // - sums to run.Sum
  // - contains only values 1..9
  // - does not have any duplicated values
  // e.g. for run length 3 and sum 10, valid sets of values would be [1,4,5], [2,3,5], [1,3,6], etc
  findSetsOfValues(run: Run): number[][] {
    const setsOfValues: number[][] = [];

    const helper = (
      n: number,
      useds: number[][],
      setOfValues: number[]
    ): void => {
      const remainingDigits = except(DIGITS, useds.flat());
      const used: number[] = [];
      useds.push(used);
      for (const digit of remainingDigits) {
        setOfValues.push(digit);
        used.push(digit);
        if (n > 1) {
          helper(n - 1, useds, setOfValues);
        } else {
          if (sum(setOfValues) === run.sum) {
            setsOfValues.push(setOfValues.slice());
          }
        }
        setOfValues.pop();
      }
      useds.pop();
    };

    const runLength = run.coordsList.length;
    helper(runLength, [], []);

    return setsOfValues;
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const { puzzle, run, values } = internalRow;
    const horizontalRunColumns = this.makeHorizontalRunColumns(puzzle, run);
    const verticalRunColumns = this.makeVerticalRunColumns(puzzle, run);
    const horizontalRunValueColumns = this.makeHorizontalRunValueColumns(
      puzzle,
      run,
      values
    );
    const verticalRunValueColumns = this.makeVerticalRunValueColumns(
      puzzle,
      run,
      values
    );
    return horizontalRunColumns
      .concat(verticalRunColumns)
      .concat(horizontalRunValueColumns)
      .concat(verticalRunValueColumns);
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    return puzzle.horizontalRuns.length + puzzle.verticalRuns.length;
  }

  makeHorizontalRunColumns(puzzle: Puzzle, run: Run): number[] {
    const columns = Array(puzzle.horizontalRuns.length).fill(0);
    if (run.runType === RunType.Horizontal) {
      const index = this.findHorizontalRunIndex(puzzle, run);
      columns[index] = 1;
    }
    return columns;
  }

  makeVerticalRunColumns(puzzle: Puzzle, run: Run): number[] {
    const columns = Array(puzzle.verticalRuns.length).fill(0);
    if (run.runType === RunType.Vertical) {
      const index = this.findVerticalRunIndex(puzzle, run);
      columns[index] = 1;
    }
    return columns;
  }

  makeHorizontalRunValueColumns(
    puzzle: Puzzle,
    run: Run,
    values: number[]
  ): number[] {
    const encodedValueLength = DIGITS.length;
    const columns = Array(puzzle.unknowns.length * encodedValueLength).fill(0);

    for (const index of range(run.coordsList.length)) {
      const value = values[index];
      const encodedValue =
        run.runType === RunType.Horizontal
          ? this.encodeValueNormal(value)
          : this.encodeValueInverse(value);
      const unknown = run.coordsList[index];
      const unknownIndex = this.findUnknownIndex(puzzle, unknown);
      for (const encodedValueIndex of range(encodedValueLength)) {
        columns[unknownIndex * encodedValueLength + encodedValueIndex] =
          encodedValue[encodedValueIndex];
      }
    }

    return columns;
  }

  makeVerticalRunValueColumns(
    puzzle: Puzzle,
    run: Run,
    values: number[]
  ): number[] {
    const encodedValueLength = DIGITS.length;
    const columns = Array(puzzle.unknowns.length * encodedValueLength).fill(0);

    for (const index of range(run.coordsList.length)) {
      const value = values[index];
      const encodedValue =
        run.runType === RunType.Vertical
          ? this.encodeValueNormal(value)
          : this.encodeValueInverse(value);
      const unknown = run.coordsList[index];
      const unknownIndex = this.findUnknownIndex(puzzle, unknown);
      for (const encodedValueIndex of range(encodedValueLength)) {
        columns[unknownIndex * encodedValueLength + encodedValueIndex] =
          encodedValue[encodedValueIndex];
      }
    }

    return columns;
  }

  encodeValueNormal(value: number): number[] {
    const columns = Array(DIGITS.length).fill(0);
    const index = value - 1;
    columns[index] = 1;
    return columns;
  }

  encodeValueInverse(value: number): number[] {
    const columns = Array(DIGITS.length).fill(1);
    const index = value - 1;
    columns[index] = 0;
    return columns;
  }

  findHorizontalRunIndex(puzzle: Puzzle, run: Run): number {
    return puzzle.horizontalRuns.findIndex((r) => sameRun(r, run));
  }

  findVerticalRunIndex(puzzle: Puzzle, run: Run): number {
    return puzzle.verticalRuns.findIndex((r) => sameRun(r, run));
  }

  findUnknownIndex(puzzle: Puzzle, unknown: Coords): number {
    return puzzle.unknowns.findIndex((u) => sameCoords(u, unknown));
  }
}
