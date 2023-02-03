import { Coords, IDemo, sameCoords } from "types"
import { range } from "utils"
import { KakuroInternalRow } from "./internal-row"
import { Run, sameRun } from "./run"
import { Puzzle } from "./puzzle"
import { RunType } from "./run-type"

export class KakuroDemo implements IDemo<Puzzle, KakuroInternalRow> {

  buildInternalRows(puzzle: Puzzle): KakuroInternalRow[] {
    return []
  }

  internalRowToMatrixRow(internalRow: KakuroInternalRow): number[] {
    const { puzzle, run, values } = internalRow
    const horizontalRunColumns = this.makeHorizontalRunColumns(puzzle, run)
    const verticalRunColumns = this.makeVerticalRunColumns(puzzle, run)
    const horizontalRunValueColumns = this.makeHorizontalRunValueColumns(puzzle, run, values)
    const verticalRunValueColumns = this.makeVerticalRunValueColumns(puzzle, run, values)
    return horizontalRunColumns
      .concat(verticalRunColumns)
      .concat(horizontalRunValueColumns)
      .concat(verticalRunValueColumns)
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    return puzzle.horizontalRuns.length + puzzle.verticalRuns.length
  }

  makeHorizontalRunColumns(puzzle: Puzzle, run: Run): number[] {
    const columns = Array(puzzle.horizontalRuns.length).fill(0)
    if (run.runType === RunType.Horizontal) {
      const index = this.findHorizontalRunIndex(puzzle, run)
      columns[index] = 1
    }
    return columns
  }

  makeVerticalRunColumns(puzzle: Puzzle, run: Run): number[] {
    const columns = Array(puzzle.verticalRuns.length).fill(0)
    if (run.runType === RunType.Vertical) {
      const index = this.findVerticalRunIndex(puzzle, run)
      columns[index] = 1
    }
    return columns
  }

  makeHorizontalRunValueColumns(puzzle: Puzzle, run: Run, values: number[]): number[] {
    const columns = Array(puzzle.unknowns.length * 9).fill(0)
    for (const index of range(run.coordsList.length)) {
      const value = values[index]
      const encodedValue = run.runType === RunType.Horizontal
        ? this.encodeValueNormal(value)
        : this.encodeValueInverse(value)
      const unknown = run.coordsList[index]
      const unknownIndex = this.findUnknownIndex(puzzle, unknown)
      for (const encodedValueIndex of range(9)) {
        columns[unknownIndex * 9 + encodedValueIndex] = encodedValue[encodedValueIndex]
      }
    }
    return columns
  }

  makeVerticalRunValueColumns(puzzle: Puzzle, run: Run, values: number[]): number[] {
    const columns = Array(puzzle.unknowns.length * 9).fill(0)
    for (const index of range(run.coordsList.length)) {
      const value = values[index]
      const encodedValue = run.runType === RunType.Vertical
        ? this.encodeValueNormal(value)
        : this.encodeValueInverse(value)
      const unknown = run.coordsList[index]
      const unknownIndex = this.findUnknownIndex(puzzle, unknown)
      for (const encodedValueIndex of range(9)) {
        columns[unknownIndex * 9 + encodedValueIndex] = encodedValue[encodedValueIndex]
      }
    }
    return columns
  }

  encodeValueNormal(value: number): number[] {
    const columns = Array(9).fill(0)
    const index = value - 1
    columns[index] = 1
    return columns
  }

  encodeValueInverse(value: number): number[] {
    const columns = Array(9).fill(1)
    const index = value - 1
    columns[index] = 0
    return columns
  }

  findHorizontalRunIndex(puzzle: Puzzle, run: Run): number {
    return puzzle.horizontalRuns.findIndex(r => sameRun(r, run))
  }

  findVerticalRunIndex(puzzle: Puzzle, run: Run): number {
    return puzzle.verticalRuns.findIndex(r => sameRun(r, run))
  }

  findUnknownIndex(puzzle: Puzzle, unknown: Coords): number {
    return puzzle.unknowns.findIndex(u => sameCoords(u, unknown))
  }
}
