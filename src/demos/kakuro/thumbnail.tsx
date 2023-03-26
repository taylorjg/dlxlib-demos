import { first } from "utils"
import { Drawing } from "./drawing"
import { InternalRow } from "./internal-row"
import { Run } from "./run"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"

export const Thumbnail = () => {
  const { puzzle, solutionInternalRows } = makeThumbnailSolution()
  const drawingOptions = { showClues: true }

  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  )
}

export const makeThumbnailSolution = () => {
  const puzzle = first(puzzles)
  const solution = [
    "..........",
    "..79.54.79",
    ".241.95768",
    ".9587.789.",
    ".12.2469..",
    ".31.629.61",
    "...2153.89",
    "..948.1254",
    ".65347.342",
    ".13.31.13."
  ]
  const solutionInternalRows = parseSolution(puzzle, solution)
  return { puzzle, solutionInternalRows }
}

const parseSolution = (puzzle: Puzzle, solution: string[]): InternalRow[] => {
  const makeInternalRowsForRuns = (runs: Run[]): InternalRow[] =>
    runs.map(run => {
      const values = run.coordsList.map(({ row, col }) => Number(solution[row][col]))
      return { puzzle, run, values }
    })

  return makeInternalRowsForRuns(puzzle.horizontalRuns)
    .concat(makeInternalRowsForRuns(puzzle.verticalRuns))
}
