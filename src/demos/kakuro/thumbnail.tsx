import { first } from "utils"
import { Drawing } from "./drawing"
import { KakuroInternalRow } from "./internal-row"
import { Run } from "./run"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"

export const Thumbnail = () => {
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
  return <Drawing puzzle={puzzle} solutionInternalRows={solutionInternalRows} />
}

const parseSolution = (puzzle: Puzzle, solution: string[]): KakuroInternalRow[] => {
  const makeInternalRowsForRuns = (runs: Run[]): KakuroInternalRow[] =>
    runs.map(run => {
      const values = run.coordsList.map(({ row, col }) => Number(solution[row][col]))
      return { puzzle, run, values }
    })

  return makeInternalRowsForRuns(puzzle.horizontalRuns)
    .concat(makeInternalRowsForRuns(puzzle.verticalRuns))
}
