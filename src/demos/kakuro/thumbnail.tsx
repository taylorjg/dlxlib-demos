import { first, range } from "utils"
import { Coords } from "types"
import { KakuroDrawing } from "./drawing"
import { KakuroInternalRow } from "./internal-row"
import { Run } from "./run"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"

export const KakuroThumbnail = () => {
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
  return <KakuroDrawing puzzle={puzzle} solutionInternalRows={solutionInternalRows} />
}

const parseSolution = (puzzle: Puzzle, solution: string[]): KakuroInternalRow[] => {
  const dict = new Map<string, number>()
  const size = puzzle.size

  const makeKeyFromCoords = ({ row, col }: Coords): string => makeKeyFromRowCol(row, col)
  const makeKeyFromRowCol = (row: number, col: number): string => `${row}:${col}`

  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = solution[row][col]
      const value = Number(ch)
      if (Number.isInteger(value)) {
        const key = makeKeyFromRowCol(row, col)
        dict.set(key, value)
      }
    }
  }

  const makeInternalRowsForRuns = (runs: Run[]): KakuroInternalRow[] =>
    runs.map(run => {
      const values = run.coordsList.map(coords => dict.get(makeKeyFromCoords(coords))!)
      return { puzzle, run, values }
    })

  return makeInternalRowsForRuns(puzzle.horizontalRuns)
    .concat(makeInternalRowsForRuns(puzzle.verticalRuns))
}
