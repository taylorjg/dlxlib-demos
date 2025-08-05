import { IDemo } from "types";
import { except, range, sum } from "utils";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { doPermute } from "./permutations";
import { RunType } from "./run-type";
import { Run } from "./run";

const DIGITS = range(19).map((n) => n + 1);

export const horizontalRuns: Run[] = [
  {
    runType: RunType.Horizontal,
    cellIds: [0, 1, 2],
  },
  {
    runType: RunType.Horizontal,
    cellIds: [3, 4, 5, 6],
  },
  {
    runType: RunType.Horizontal,
    cellIds: [7, 8, 9, 10, 11],
  },
  {
    runType: RunType.Horizontal,
    cellIds: [12, 13, 14, 15],
  },
  {
    runType: RunType.Horizontal,
    cellIds: [16, 17, 18],
  },
];

export const diagonal1Runs: Run[] = [
  {
    runType: RunType.Diagonal1,
    cellIds: [0, 3, 7],
  },
  {
    runType: RunType.Diagonal1,
    cellIds: [1, 4, 8, 12],
  },
  {
    runType: RunType.Diagonal1,
    cellIds: [2, 5, 9, 13, 16],
  },
  {
    runType: RunType.Diagonal1,
    cellIds: [6, 10, 14, 17],
  },
  {
    runType: RunType.Diagonal1,
    cellIds: [11, 15, 18],
  },
];

export const diagonal2Runs: Run[] = [
  {
    runType: RunType.Diagonal2,
    cellIds: [2, 6, 11],
  },
  {
    runType: RunType.Diagonal2,
    cellIds: [1, 5, 10, 15],
  },
  {
    runType: RunType.Diagonal2,
    cellIds: [0, 4, 9, 14, 18],
  },
  {
    runType: RunType.Diagonal2,
    cellIds: [3, 8, 13, 17],
  },
  {
    runType: RunType.Diagonal2,
    cellIds: [7, 12, 16],
  },
];

export class Demo implements IDemo<Puzzle, InternalRow> {
  buildInternalRows(
    _puzzle: Puzzle,
    _checkForCancellation: () => boolean
  ): InternalRow[] {
    const internalRows: InternalRow[] = [];

    const createInternalRowsFor = (runs: Run[]): void => {
      for (const run of runs) {
        for (const setOfValues of this.findSetsOfValues(run.cellIds.length)) {
          for (const values of doPermute(setOfValues)) {
            const internalRow = { run, values };
            internalRows.push(internalRow);
          }
        }
      }
    };

    createInternalRowsFor(horizontalRuns);
    createInternalRowsFor(diagonal1Runs);
    createInternalRowsFor(diagonal2Runs);

    return internalRows;
  }

  // Return sets of values where each set of values:
  // - has the given length (3, 4, or 5)
  // - sums to 38
  // - contains only values 1..19
  // - does not have any duplicated values
  findSetsOfValues(length: number): number[][] {
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
          if (sum(setOfValues) === 38) {
            setsOfValues.push(setOfValues.slice());
          }
        }
        setOfValues.pop();
      }
      useds.pop();
    };

    helper(length, [], []);

    return setsOfValues;
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const { run, values } = internalRow;

    const runColumns1 = this.makeHorizontalRunColumns(run);
    const runColumns2 = this.makeDiagonal1RunColumns(run);
    const runColumns3 = this.makeDiagonal2RunColumns(run);

    const digitsColumns = this.makeDigitsColumns(
      run,
      values,
      RunType.Diagonal1
    );

    const valuesColumns1 = this.makeValuesColumns(
      run,
      values,
      RunType.Horizontal,
      RunType.Diagonal1
    );

    const valuesColumns2 = this.makeValuesColumns(
      run,
      values,
      RunType.Horizontal,
      RunType.Diagonal2
    );

    const valuesColumns3 = this.makeValuesColumns(
      run,
      values,
      RunType.Diagonal1,
      RunType.Diagonal2
    );

    return runColumns1
      .concat(runColumns2)
      .concat(runColumns3)
      .concat(digitsColumns)
      .concat(valuesColumns1)
      .concat(valuesColumns2)
      .concat(valuesColumns3);
  }

  getNumPrimaryColumns(_puzzle: Puzzle): number | undefined {
    return (
      horizontalRuns.length +
      diagonal1Runs.length +
      diagonal2Runs.length +
      DIGITS.length
    );
  }

  makeHorizontalRunColumns(run: Run): number[] {
    const columns = Array(horizontalRuns.length).fill(0);
    if (run.runType === RunType.Horizontal) {
      const index = this.findHorizontalRunIndex(run);
      columns[index] = 1;
    }
    return columns;
  }

  makeDiagonal1RunColumns(run: Run): number[] {
    const columns = Array(diagonal1Runs.length).fill(0);
    if (run.runType === RunType.Diagonal1) {
      const index = this.findDiagonal1RunIndex(run);
      columns[index] = 1;
    }
    return columns;
  }

  makeDiagonal2RunColumns(run: Run): number[] {
    const columns = Array(diagonal2Runs.length).fill(0);
    if (run.runType === RunType.Diagonal2) {
      const index = this.findDiagonal2RunIndex(run);
      columns[index] = 1;
    }
    return columns;
  }

  makeDigitsColumns(run: Run, values: number[], runType: RunType): number[] {
    const columns = Array(DIGITS.length).fill(0);

    if (run.runType === runType) {
      for (const value of values) {
        const index = value - 1;
        columns[index] = 1;
      }
    }

    return columns;
  }

  makeValuesColumns(
    run: Run,
    values: number[],
    normalRunType: RunType,
    inverseRunType: RunType
  ): number[] {
    const encodedValueLength = DIGITS.length;
    const columns = Array(DIGITS.length * encodedValueLength).fill(0);

    for (const index of range(run.cellIds.length)) {
      const cellId = run.cellIds[index];
      const value = values[index];
      const encodedValue = this.encodeValue(
        value,
        run.runType,
        normalRunType,
        inverseRunType
      );
      for (const encodedValueIndex of range(encodedValueLength)) {
        columns[cellId * encodedValueLength + encodedValueIndex] =
          encodedValue[encodedValueIndex];
      }
    }

    return columns;
  }

  encodeValue(
    value: number,
    runType: RunType,
    normalRunType: RunType,
    inverseRunType: RunType
  ): number[] {
    if (runType === normalRunType) {
      return this.encodeValueNormal(value);
    }

    if (runType === inverseRunType) {
      return this.encodeValueInverse(value);
    }

    return Array(DIGITS.length).fill(0);
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

  findHorizontalRunIndex(run: Run): number {
    return horizontalRuns.findIndex((r) => r === run);
  }

  findDiagonal1RunIndex(run: Run): number {
    return diagonal1Runs.findIndex((r) => r === run);
  }

  findDiagonal2RunIndex(run: Run): number {
    return diagonal2Runs.findIndex((r) => r === run);
  }
}
