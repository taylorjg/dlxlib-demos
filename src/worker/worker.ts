// Unexpected use of 'self'.
/* eslint-disable no-restricted-globals */

import * as dlxlib from "dlxlib/dlx"
import * as Sudoku from "demos/sudoku"
import * as NQueens from "demos/n-queens"
import * as FlowFree from "demos/flow-free"
import * as Kakuro from "demos/kakuro"

const map = new Map<string, any>([
  ["sudoku", Sudoku.Demo],
  ["n-queens", NQueens.Demo],
  ["flow-free", FlowFree.Demo],
  ["kakuro", Kakuro.Demo]
])

// 'worker.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.ts(1208)
export { }

type SearchStepEvent = {
  partialSolution: number[],
  stepIndex: number
}

type SolutionFoundEvent = {
  solution: number[],
  solutionIndex: number
}

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

  const onStep = (event: SearchStepEvent) => {
    console.log("[worker onStep]", "stepIndex:", event.stepIndex)
    const partialSolution = event.partialSolution
    const solutionInternalRows = partialSolution.map(index => internalRows[index])
    self.postMessage({ type: "searchStep", solutionInternalRows })
  }

  const onSolution = (event: SolutionFoundEvent) => {
    console.log("[worker onSolution]", "solutionIndex:", event.solutionIndex)
    const solution = event.solution
    const solutionInternalRows = solution.map(index => internalRows[index])
    self.postMessage({ type: "solutionFound", solutionInternalRows })
  }

  const dlx = new dlxlib.Dlx()
  dlx.addListener("step", onStep)
  dlx.addListener("solution", onSolution)
  const solutions = dlx.solve(matrix, options)

  self.postMessage({ type: "finished", numSolutionsFound: solutions.length })
}

self.onmessage = (ev: MessageEvent<any>) => {
  try {
    console.log("[worker onmessage]", "ev.data.type:", ev.data.type)
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
