import { IDemo } from "types"
import { range } from "utils"
import { Colour } from "./colour"
import { InternalRow } from "./internal-row"
import { piecesWithVariations } from "./pieces-with-variations"

export class Demo implements IDemo<{}, InternalRow> {

  buildInternalRows(puzzle: {}): InternalRow[] {
    return this.allPossiblePiecePlacements()
      .filter(internalRow => this.isValidPiecePlacement(internalRow))
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const pieceColumns = this.makePieceColumns(internalRow)
    const locationColumns = this.makeLocationColumns(internalRow)
    return pieceColumns.concat(locationColumns)
  }

  getNumPrimaryColumns(puzzle: {}): number | undefined {
    return undefined
  }

  allLocations =
    range(8).flatMap(row =>
      range(8).map(col =>
        ({ row, col })))

  isValidPiecePlacement(internalRow: InternalRow): boolean {
    for (const square of internalRow.variation.squares) {
      const { coords, colour } = square
      const row = internalRow.location.row + coords.row
      const col = internalRow.location.col + coords.col
      if (row < 0 || row >= 8) return false
      if (col < 0 || col >= 8) return false
      const requiredColour = (row + col) % 2 !== 0 ? Colour.White : Colour.Black
      if (colour !== requiredColour) return false
    }
    return true
  }

  allPossiblePiecePlacements(): InternalRow[] {
    const internalRows: InternalRow[] = []
    const fixedPiecesLabels = piecesWithVariations.slice(0, 1).map(({ label }) => label)

    for (const pieceWithVariations of piecesWithVariations) {
      const variations = fixedPiecesLabels.includes(pieceWithVariations.label)
        ? pieceWithVariations.variations.slice(0, 1)
        : pieceWithVariations.variations

      for (const variation of variations) {
        for (const location of this.allLocations) {
          const label = pieceWithVariations.label
          const internalRow = { label, variation, location }
          internalRows.push(internalRow)
        }
      }
    }

    return internalRows
  }

  makePieceColumns(internalRow: InternalRow): number[] {
    const columns = Array(piecesWithVariations.length).fill(0)
    const pieceIndex = piecesWithVariations.findIndex(pwv => pwv.label === internalRow.label)
    columns[pieceIndex] = 1
    return columns
  }

  makeLocationColumns(internalRow: InternalRow): number[] {
    const indices = internalRow.variation.squares.map(square => {
      const { coords } = square
      const row = internalRow.location.row + coords.row
      const col = internalRow.location.col + coords.col
      return row * 8 + col
    })

    const columns = Array(8 * 8).fill(0)

    for (const index of indices) {
      columns[index] = 1
    }

    return columns
  }
}
