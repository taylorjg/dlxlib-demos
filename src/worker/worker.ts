// Unexpected use of 'self'.
/* eslint-disable no-restricted-globals */

import * as dlxlib from "dlxlib/dlx"
import { Demo as SudokuDemo } from "demos/sudoku/demo"
import { Demo as PentominoesDemo } from "demos/pentominoes/demo"
import { Demo as DraughtboardPuzzleDemo } from "demos/draughtboard-puzzle/demo"
import { Demo as NQueensDemo } from "demos/n-queens/demo"
import { Demo as TetraSticksDemo } from "demos/tetrasticks/demo"
import { Demo as AztecDiamondDemo } from "demos/aztec-diamond/demo"
import { Demo as RippleEffectDemo } from "demos/ripple-effect/demo"
import { Demo as FlowFreeDemo } from "demos/flow-free/demo"
import { Demo as KakuroDemo } from "demos/kakuro/demo"
import { Demo as NonogramDemo } from "demos/nonogram/demo"
import { Demo as CrosswordDemo } from "demos/crossword/demo"

const map = new Map<string, any>([
  ["sudoku", SudokuDemo],
  ["pentominoes", PentominoesDemo],
  ["draughtboard-puzzle", DraughtboardPuzzleDemo],
  ["n-queens", NQueensDemo],
  ["tetrasticks", TetraSticksDemo],
  ["aztec-diamond", AztecDiamondDemo],
  ["ripple-effect", RippleEffectDemo],
  ["flow-free", FlowFreeDemo],
  ["kakuro", KakuroDemo],
  ["nonogram", NonogramDemo],
  ["crossword", CrosswordDemo]
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
  // dlx.addListener("step", onStep)
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
    console.error("error:", error)
    if (error instanceof Error) {
      self.postMessage({ type: "error", message: error.message })
    } else {
      self.postMessage({ type: "error", message: String(error) })
    }
  }
}
