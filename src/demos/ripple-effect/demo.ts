import { Coords, goDown, goLeft, goRight, goUp, IDemo } from "types"
import { except, range } from "utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

export class Demo implements IDemo<Puzzle, InternalRow> {

  buildInternalRows(puzzle: Puzzle, checkForCancellation: () => boolean): InternalRow[] {
    const internalRows: InternalRow[] = []

    for (const room of puzzle.rooms) {
      for (const initialValue of room.initialValues) {
        const { cell, value } = initialValue
        const isInitialValue = true
        const internalRow = { puzzle, cell, value, isInitialValue, room }
        internalRows.push(internalRow)
      }

      const givenCells = room.initialValues.map(({ cell }) => cell)
      const givenValues = room.initialValues.map(({ value }) => value)
      const cellsToSolve = except(room.cells, givenCells)
      const values = range(room.cells.length).map(n => n + 1)
      const valuesToSolve = except(values, givenValues)

      for (const cell of cellsToSolve) {
        for (const value of valuesToSolve) {
          const isInitialValue = false
          const internalRow = { puzzle, cell, value, isInitialValue, room }
          internalRows.push(internalRow)
        }
      }
    }

    return internalRows
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const locationColumns = this.makeLocationColumns(internalRow)
    const roomColumns = this.makeRoomColumns(internalRow)
    const rippleColumns = this.makeRippleColumns(internalRow)
    return locationColumns
      .concat(roomColumns)
      .concat(rippleColumns)
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    const { size } = puzzle
    return size * size * 2
  }

  makeLocationColumns(internalRow: InternalRow): number[] {
    const size = internalRow.puzzle.size
    const columns = Array(size * size).fill(0)
    const { row, col } = internalRow.cell
    const index = row * size + col
    columns[index] = 1
    return columns
  }

  makeRoomColumns(internalRow: InternalRow): number[] {
    const size = internalRow.puzzle.size
    const columns = Array(size * size).fill(0)
    const index = internalRow.room.startIndex + internalRow.value - 1
    columns[index] = 1
    return columns
  }

  makeRippleColumns(internalRow: InternalRow): number[] {
    const { size, maxValue } = internalRow.puzzle
    const arrayOfArrays: number[][] = range(maxValue * 4).map(_ => Array(size * size).fill(0))
    const baseIndex = (internalRow.value - 1) * 4

    const setRippleColumnBits = (baseIndexOffset: number, transformCoords: (coords: Coords) => Coords): void => {
      const rippleCells = this.getRippleCells(internalRow, transformCoords)
      const array = arrayOfArrays[baseIndex + baseIndexOffset]
      for (const cell of rippleCells) {
        const index = cell.row * size + cell.col
        array[index] = 1
      }
    }

    setRippleColumnBits(0, goUp)
    setRippleColumnBits(1, goDown)
    setRippleColumnBits(2, goLeft)
    setRippleColumnBits(3, goRight)

    return arrayOfArrays.flat()
  }

  getRippleCells(
    internalRow: InternalRow,
    transformCoords: (coords: Coords) => Coords
  ): Coords[] {
    const size = internalRow.puzzle.size
    let cell = internalRow.cell
    const cells: Coords[] = [cell]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ of range(internalRow.value)) {
      cell = transformCoords(cell)
      const { row, col } = cell
      if (row >= 0 && row < size && col >= 0 && col < size) {
        cells.push({ row, col })
      }
    }

    return cells
  }
}
