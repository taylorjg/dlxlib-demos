import { IDemo, sameCoords } from "types"
import { range } from "utils"
import { InternalRow } from "./internal-row"
import { allHorizontals, allJunctions, allVerticals } from "./locations"
import { piecesWithVariations } from "./pieces-with-variations"
import { makeThumbnailSolution } from "./thumbnail"

export class Demo implements IDemo<{}, InternalRow> {

  buildInternalRows(_puzzle: {}, checkForCancellation: () => boolean): InternalRow[] {
    return this.allPossiblePiecePlacements(5).filter(this.isValidPiecePlacement)
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

  getNumPrimaryColumns(_puzzle: {}): number | undefined {
    const numPieces = piecesWithVariations.length
    const numHorizontals = allHorizontals.length
    const numVerticals = allVerticals.length
    return numPieces + numHorizontals + numVerticals
  }

  isValidPiecePlacement(internalRow: InternalRow): boolean {
    const { location } = internalRow

    for (const horizontal of internalRow.variation.horizontals) {
      const row = location.row + horizontal.row
      const col = location.col + horizontal.col
      const coords = { row, col }
      if (!allHorizontals.some(h => sameCoords(h, coords))) return false
    }

    for (const vertical of internalRow.variation.verticals) {
      const row = location.row + vertical.row
      const col = location.col + vertical.col
      const coords = { row, col }
      if (!allVerticals.some(v => sameCoords(v, coords))) return false
    }

    return true
  }

  allPossiblePiecePlacements(numFixedPieces: number): InternalRow[] {
    const internalRows: InternalRow[] = []
    const { solutionInternalRows } = makeThumbnailSolution()
    const fixedInternalRows = solutionInternalRows.slice(0, numFixedPieces)

    for (const pieceWithVariations of piecesWithVariations) {
      const fixedInternalRow = fixedInternalRows.find(fir => (
        fir.label === pieceWithVariations.label &&
        fir.variation.reflected === pieceWithVariations.variations[0].reflected
      ))

      if (fixedInternalRow) {
        internalRows.push(fixedInternalRow)
        continue
      }

      const allLocationsInBoundingSquare =
        range(9).flatMap(row =>
          range(9).map(col =>
            ({ row, col })))

      for (const variation of pieceWithVariations.variations) {
        for (const location of allLocationsInBoundingSquare) {
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
    const index = piecesWithVariations.findIndex(pwv => (
      pwv.label === internalRow.label &&
      pwv.variations[0].reflected === internalRow.variation.reflected
    ))
    columns[index] = 1
    return columns
  }

  makeHorizontalsColumns(internalRow: InternalRow): number[] {
    const { location } = internalRow
    const columns = Array(allHorizontals.length).fill(0)
    for (const horizontal of internalRow.variation.horizontals) {
      const row = location.row + horizontal.row
      const col = location.col + horizontal.col
      const coords = { row, col }
      const index = allHorizontals.findIndex(h => sameCoords(h, coords))
      if (index >= 0) {
        columns[index] = 1
      }
    }
    return columns
  }

  makeVerticalsColumns(internalRow: InternalRow): number[] {
    const { location } = internalRow
    const columns = Array(allVerticals.length).fill(0)
    for (const vertical of internalRow.variation.verticals) {
      const row = location.row + vertical.row
      const col = location.col + vertical.col
      const coords = { row, col }
      const index = allVerticals.findIndex(v => sameCoords(v, coords))
      if (index >= 0) {
        columns[index] = 1
      }
    }
    return columns
  }

  makeJunctionsColumns(internalRow: InternalRow): number[] {
    const { location } = internalRow
    const columns = Array(allJunctions.length).fill(0)
    for (const junction of internalRow.variation.junctions) {
      const row = location.row + junction.row
      const col = location.col + junction.col
      const coords = { row, col }
      const index = allJunctions.findIndex(j => sameCoords(j, coords))
      if (index >= 0) {
        columns[index] = 1
      }
    }
    return columns
  }
}
