// Unexpected use of 'self'.
/* eslint-disable no-restricted-globals */

import * as dlxlib from "dlxlib/dlx"
import { Mode } from "types"

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

const onSolve = (shortName: string, puzzle: any, mode: Mode) => {
  const demoConstructor = map.get(shortName)
  if (!demoConstructor) {
    self.postMessage({ type: "unknownDemo" })
    return
  }
  const demo = new demoConstructor()
  console.log("[worker onSolve]", "building internal rows...")
  const internalRows = demo.buildInternalRows(puzzle)
  console.log("[worker onSolve]", "internalRows.length:", internalRows.length)
  console.log("[worker onSolve]", "building matrix...")
  const matrix = internalRows.map((internalRow: any) => {
    const matrixRow = demo.internalRowToMatrixRow(internalRow)
    return new Uint8Array(matrixRow)
  })
  console.log("[worker onSolve]", "matrix size:", `${matrix.length}x${matrix[0].length}`)
  const options: dlxlib.Options = {
    numSolutions: 1,
    numPrimaryColumns: demo.getNumPrimaryColumns(puzzle)
  }

  let searchStepCount = 0

  const onStep = (event: SearchStepEvent) => {
    searchStepCount++
    if (searchStepCount % 100 === 0) {
      console.log("[worker onStep]", "searchStepCount:", searchStepCount)
    }
    if (mode === Mode.SearchSteps) {
      const partialSolution = event.partialSolution
      const solutionInternalRows = partialSolution.map(index => internalRows[index])
      self.postMessage({ type: "searchStep", solutionInternalRows })
    }
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

  console.log("[worker onSolve]", "solving matrix...")
  const solutions = dlx.solve(matrix, options)
  console.log("[worker onSolve]", "searchStepCount:", searchStepCount)
  console.log("[worker onSolve]", "solutions.length:", solutions.length)

  self.postMessage({ type: "finished", numSolutionsFound: solutions.length })
}

self.onmessage = (ev: MessageEvent<any>) => {
  try {
    console.log("[worker onmessage]", "ev.data.type:", ev.data.type)
    if (ev.data.type === "solve") {
      const shortName = ev.data.shortName as string
      const mode = ev.data.mode as Mode
      const { puzzle } = ev.data
      onSolve(shortName, puzzle, mode)
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
