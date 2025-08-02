/* eslint-disable @typescript-eslint/no-unused-vars */

import { Coords, IDemo, sameCoords } from "types";
import { except, range, sum } from "utils";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { doPermute } from "./permutations";

const DIGITS = range(19).map((n) => n + 1);

export class Demo implements IDemo<Puzzle, InternalRow> {
  buildInternalRows(
    puzzle: Puzzle,
    _checkForCancellation: () => boolean
  ): InternalRow[] {
    const setsOfValuesForLength3 = this.findSetsOfValues(3);
    const setsOfValuesForLength4 = this.findSetsOfValues(4);
    const setsOfValuesForLength5 = this.findSetsOfValues(5);

    console.log({
      setsOfValuesForLength3,
      setsOfValuesForLength4,
      setsOfValuesForLength5,
    });

    console.log(doPermute(setsOfValuesForLength3[0]));
    console.log(doPermute(setsOfValuesForLength4[0]));
    console.log(doPermute(setsOfValuesForLength5[0]));

    // TODO
    return [];
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
    // TODO
    return [];
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    // TODO
    return 0;
  }
}
