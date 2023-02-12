import { IDemo } from "types"
import { range } from "utils"
import { InternalRow } from "./internal-row"
import { PieceWithVariations } from "./piece-with-variations"
import { piecesWithVariations } from "./pieces-with-variations"
import { Puzzle } from "./puzzle"

export class Demo implements IDemo<Puzzle, InternalRow> {

  buildInternalRows(puzzle: Puzzle): InternalRow[] {
    return this.allPossiblePiecePlacements(puzzle).filter(this.isValidPiecePlacement)
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const pieceColumns = this.makePieceColumns(internalRow)
    const horizontalsColumns = this.makeHorizontalsColumns(internalRow)
    const vertialsColumns = this.makeVerticalsColumns(internalRow)
    const junctionsColumns = this.makeJunctionsColumns(internalRow)
    return pieceColumns
      .concat(horizontalsColumns)
      .concat(vertialsColumns)
      .concat(junctionsColumns)
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    const numPieces = 15
    const numHorizontals = 30
    const numVerticals = 30
    return numPieces + numHorizontals + numVerticals
  }

  allLocations =
    range(9).flatMap(row =>
      range(9).map(col =>
        ({ row, col })))

  getPiecesInPlay(puzzle: Puzzle): PieceWithVariations[] {
    return piecesWithVariations.filter(pwv => pwv.label !== puzzle.pieceToOmit.label)
  }

  isValidPiecePlacement(internalRow: InternalRow): boolean {
    const { location } = internalRow

    for (const horizontal of internalRow.variation.horizontals) {
      const row = location.row + horizontal.row
      const col = location.col + horizontal.col
      if (row > 5) return false // valid rows for horizontal line segments: 0..5
      if (col > 4) return false // valid cols for horizontal line segments: 0..4
    }

    for (const vertical of internalRow.variation.verticals) {
      const row = location.row + vertical.row
      const col = location.col + vertical.col
      if (row > 4) return false // valid rows for vertical line segments: 0..4
      if (col > 5) return false // valid cols for vertical line segments: 0..5
    }

    return true
  }

  allPossiblePiecePlacements(puzzle: Puzzle): InternalRow[] {
    const internalRows: InternalRow[] = []
    const fixedPieceLabels = piecesWithVariations.slice().reverse().slice(0, 1).map(({ label }) => label)
    const piecesInPlay = this.getPiecesInPlay(puzzle)

    for (const pieceWithVariations of piecesInPlay) {
      const variations = fixedPieceLabels.includes(pieceWithVariations.label)
        ? pieceWithVariations.variations.slice(0, 1)
        : pieceWithVariations.variations

      for (const variation of variations) {
        for (const location of this.allLocations) {
          const label = pieceWithVariations.label
          const internalRow = { puzzle, label, variation, location }
          internalRows.push(internalRow)
        }
      }
    }

    return internalRows
  }

  makePieceColumns(internalRow: InternalRow): number[] {
    const piecesInPlay = this.getPiecesInPlay(internalRow.puzzle)
    const columns = Array(piecesInPlay.length).fill(0)
    const index = piecesInPlay.findIndex(pip => pip.label === internalRow.label)
    columns[index] = 1
    return columns
  }

  makeHorizontalsColumns(internalRow: InternalRow): number[] {
    const { location } = internalRow
    const columns = Array(30).fill(0)
    for (const horizontal of internalRow.variation.horizontals) {
      const row = location.row + horizontal.row
      const col = location.col + horizontal.col
      columns[row * 5 + col] = 1
    }
    return columns
  }

  makeVerticalsColumns(internalRow: InternalRow): number[] {
    const { location } = internalRow
    const columns = Array(30).fill(0)
    for (const vertical of internalRow.variation.verticals) {
      const row = location.row + vertical.row
      const col = location.col + vertical.col
      columns[col * 5 + row] = 1
    }
    return columns
  }

  makeJunctionsColumns(internalRow: InternalRow): number[] {
    const { location } = internalRow
    const columns = Array(16).fill(0)
    for (const junction of internalRow.variation.junctions) {
      const row = location.row + junction.row
      const col = location.col + junction.col
      if (row > 0 && row < 5 && col > 0 && col < 5) {
        columns[(row - 1) * 4 + col - 1] = 1
      }
    }
    return columns
  }
}
