import { IDemo } from "types"
import { solve } from "dlxlib"

export function findFirstSolution<TPuzzle, TInternalRow>(
  demo: IDemo<TPuzzle, TInternalRow>,
  puzzle: TPuzzle
): TInternalRow[] {
  const checkForCancellation = () => false
  const internalRows = demo.buildInternalRows(puzzle, checkForCancellation)
  const matrix = internalRows.map(internalRow => Uint8Array.from(demo.internalRowToMatrixRow(internalRow)))
  const numPrimaryColumns = demo.getNumPrimaryColumns(puzzle)
  const options = { numSolutions: 1, numPrimaryColumns }
  const solutions = solve(matrix, options)
  if (solutions.length === 0) return []
  const lookupInternalRow = (internalRowIndex: number) => internalRows[internalRowIndex]
  return solutions[0].map(lookupInternalRow)
}
