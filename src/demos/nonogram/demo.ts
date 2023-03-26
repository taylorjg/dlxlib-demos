import { Coords, IDemo, sameCoords } from "types";
import { except, range, sum } from "utils";
import { Puzzle } from "./puzzle";
import { InternalRow } from "./internal-row";
import { RunGroup } from "./run-group";
import { RunGroupType } from "./run-group-type";
import { HorizontalRunGroup } from "./horizontal-run-group";
import { VerticalRunGroup } from "./vertical-run-group";

export class Demo implements IDemo<Puzzle, InternalRow> {
  buildInternalRows(
    puzzle: Puzzle,
    checkForCancellation: () => boolean
  ): InternalRow[] {
    type StartingPositionData = {
      startingPosition: number;
      runLength: number;
    };

    const size = puzzle.size;
    const internalRows: InternalRow[] = [];

    const buildInternalRowsForRunGroup = (runGroup: RunGroup): void => {
      const workingSetOfStartingPositions: StartingPositionData[] = [];

      const recursivelyFindSetsOfStartingPositions = (
        startPosition: number,
        remainingLengths: number[]
      ): void => {
        if (internalRows.length % 1000 === 0) {
          if (checkForCancellation()) return;
        }

        if (remainingLengths.length === 0) {
          if (
            workingSetOfStartingPositions.length === runGroup.lengths.length
          ) {
            const setOfStartingPositions = workingSetOfStartingPositions
              .slice()
              .reverse();
            const coordsLists: Coords[][] = [];
            for (const startingPositionData of setOfStartingPositions) {
              const coordsList: Coords[] = [];
              for (const startingPosition of range(
                startingPositionData.runLength
              ).map((x) => x + startingPositionData.startingPosition)) {
                const coords = this.makeRunGroupCoords(
                  runGroup,
                  startingPosition
                );
                coordsList.push(coords);
              }
              coordsLists.push(coordsList);
            }
            const internalRow = { puzzle, runGroup, coordsLists };
            internalRows.push(internalRow);
          }
          return;
        }

        const runLength = remainingLengths[0];
        const newRemainingLengths = remainingLengths.slice(1);
        const sumOfRemainingLengths = sum(newRemainingLengths);
        const requiredGaps = newRemainingLengths.length;
        const lastValidStartPosition =
          size - sumOfRemainingLengths - requiredGaps - runLength;
        const numValidStartPositions =
          lastValidStartPosition - startPosition + 1;
        const validStartPositions = range(numValidStartPositions).map(
          (x) => x + startPosition
        );

        for (const validStartPosition of validStartPositions) {
          const pair = { startingPosition: validStartPosition, runLength };
          workingSetOfStartingPositions.push(pair);

          const newStartPosition = validStartPosition + runLength + 1;
          recursivelyFindSetsOfStartingPositions(
            newStartPosition,
            newRemainingLengths
          );

          workingSetOfStartingPositions.pop();
        }
      };

      recursivelyFindSetsOfStartingPositions(0, runGroup.lengths);
    };

    for (const horizontalRunGroup of puzzle.horizontalRunGroups) {
      buildInternalRowsForRunGroup(horizontalRunGroup);
    }

    for (const verticalRunGroup of puzzle.verticalRunGroups) {
      buildInternalRowsForRunGroup(verticalRunGroup);
    }

    return internalRows;
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    return puzzle.horizontalRunGroups.length + puzzle.verticalRunGroups.length;
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const { puzzle, runGroup, coordsLists } = internalRow;
    const rowColumns = this.makeRowColumns(puzzle, runGroup);
    const colColumns = this.makeColColumns(puzzle, runGroup);
    const horizontalBlockColumns = this.makeBlockColumns(
      puzzle,
      RunGroupType.Horizontal,
      runGroup,
      coordsLists
    );
    const verticalBlockColumns = this.makeBlockColumns(
      puzzle,
      RunGroupType.Vertical,
      runGroup,
      coordsLists
    );
    return rowColumns
      .concat(colColumns)
      .concat(horizontalBlockColumns)
      .concat(verticalBlockColumns);
  }

  makeRowColumns(puzzle: Puzzle, runGroup: RunGroup): number[] {
    const columns = Array(puzzle.horizontalRunGroups.length).fill(0);
    if (runGroup.runGroupType === RunGroupType.Horizontal) {
      const horizontalRunGroup = runGroup as HorizontalRunGroup;
      columns[horizontalRunGroup.row] = 1;
    }
    return columns;
  }

  makeColColumns(puzzle: Puzzle, runGroup: RunGroup): number[] {
    const columns = Array(puzzle.verticalRunGroups.length).fill(0);
    if (runGroup.runGroupType === RunGroupType.Vertical) {
      const verticalRunGroup = runGroup as VerticalRunGroup;
      columns[verticalRunGroup.col] = 1;
    }
    return columns;
  }

  makeBlockColumns(
    puzzle: Puzzle,
    runGroupType: RunGroupType,
    runGroup: RunGroup,
    coordsLists: Coords[][]
  ): number[] {
    const size = puzzle.size;
    const columns = Array(size * size * 2).fill(0);
    const selectedBlockCoords = coordsLists.flat();

    if (runGroup.runGroupType === runGroupType) {
      const allBlockCoords = range(size).map((otherValue) =>
        this.makeRunGroupCoords(runGroup, otherValue)
      );
      const unselectedBlockCoords = except(
        allBlockCoords,
        selectedBlockCoords,
        sameCoords
      );
      for (const coords of selectedBlockCoords) {
        this.markOn(columns, size, coords);
      }
      for (const coords of unselectedBlockCoords) {
        this.markOff(columns, size, coords);
      }
    } else {
      for (const coords of selectedBlockCoords) {
        this.markOff(columns, size, coords);
      }
    }

    return columns;
  }

  private static ON_INDEX = 0;
  private static OFF_INDEX = 1;

  markOn(columns: number[], size: number, coords: Coords): void {
    const baseIndex = (coords.row * size + coords.col) * 2;
    columns[baseIndex + Demo.ON_INDEX] = 1;
  }

  markOff(columns: number[], size: number, coords: Coords): void {
    const baseIndex = (coords.row * size + coords.col) * 2;
    columns[baseIndex + Demo.OFF_INDEX] = 1;
  }

  makeRunGroupCoords(runGroup: RunGroup, otherValue: number): Coords {
    if (runGroup.runGroupType === RunGroupType.Horizontal) {
      const horizontalRunGroup = runGroup as HorizontalRunGroup;
      return { row: horizontalRunGroup.row, col: otherValue };
    }
    if (runGroup.runGroupType === RunGroupType.Vertical) {
      const verticalRunGroup = runGroup as VerticalRunGroup;
      return { row: otherValue, col: verticalRunGroup.col };
    }
    throw new Error("[makeRunGroupCoords] unknown RunGroupType");
  }
}
