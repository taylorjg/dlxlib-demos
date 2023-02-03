// Unexpected use of 'self'.
/* eslint-disable no-restricted-globals */

import { first } from "utils"
import * as dlxlib from "dlxlib/dlx"
import * as Sudoku from "demos/sudoku"
import * as NQueens from "demos/n-queens"
import * as Kakuro from "demos/kakuro"

const map = new Map<string, any>([
  ["sudoku", Sudoku.SudokuDemo],
  ["n-queens", NQueens.NQueensDemo],
  ["kakuro", Kakuro.KakuroDemo]
])

// 'worker.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.ts(1208)
export { }

const onSolve = (shortName: string, puzzle: any) => {
  const demoConstructor = map.get(shortName)
  if (!demoConstructor) {
    self.postMessage({ type: "unknownDemo" })
    return
  }
  const demo = new demoConstructor()
  const internalRows = demo.buildInternalRows(puzzle)
  const matrix = internalRows.map((internalRow: any) => demo.internalRowToMatrixRow(internalRow))
  const options: dlxlib.Options = {
    numSolutions: 1,
    numPrimaryColumns: demo.getNumPrimaryColumns(puzzle)
  }

  const solutions = dlxlib.solve(matrix, options)

  if (solutions.length === 0) {
    self.postMessage({ type: "noSolutionFound" })
    return
  }

  const solution = first(solutions)
  console.dir(solution)
  const solutionInternalRows = solution.map(index => internalRows[index])
  console.dir(solutionInternalRows)
  self.postMessage({ type: "solutionFound", solutionInternalRows })
}

self.onmessage = (ev: MessageEvent<any>) => {
  try {
    console.log("[worker onmessage]", "ev.data:", JSON.stringify(ev.data, null, 2))
    if (ev.data.type === "solve") {
      const { shortName, puzzle } = ev.data
      onSolve(shortName, puzzle)
      return
    }
  } catch (error) {
    if (error instanceof Error) {
      self.postMessage({ type: "error", message: error.message })
    } else {
      self.postMessage({ type: "error", message: String(error) })
    }
  }
}
