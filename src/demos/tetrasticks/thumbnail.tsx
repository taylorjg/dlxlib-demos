import { Orientation } from "./orientation"
import { Drawing } from "./drawing"
import { InternalRow } from "./internal-row"
import { piecesWithVariations } from "./pieces-with-variations"
import { puzzles } from "./puzzles"
import { first } from "utils"
import { Puzzle } from "./puzzle"

export const Thumbnail = () => {
  const puzzle = first(puzzles)
  const solutionInternalRows = makeSolution(puzzle)
  const drawingOptions = {}
  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  )
}

const makeSolution = (puzzle: Puzzle): InternalRow[] => {
  return [
    makeSolutionInternalRow(puzzle, "F", Orientation.West, true, 4, 3),
    makeSolutionInternalRow(puzzle, "I", Orientation.East, false, 0, 0),
    makeSolutionInternalRow(puzzle, "J", Orientation.North, true, 3, 0),
    makeSolutionInternalRow(puzzle, "L", Orientation.North, false, 0, 0),
    makeSolutionInternalRow(puzzle, "N", Orientation.West, true, 4, 2),
    makeSolutionInternalRow(puzzle, "O", Orientation.North, false, 0, 4),
    makeSolutionInternalRow(puzzle, "P", Orientation.South, true, 2, 2),
    makeSolutionInternalRow(puzzle, "R", Orientation.South, true, 0, 2),
    makeSolutionInternalRow(puzzle, "T", Orientation.South, false, 2, 0),
    makeSolutionInternalRow(puzzle, "U", Orientation.East, true, 3, 1),
    makeSolutionInternalRow(puzzle, "V", Orientation.North, true, 0, 0),
    makeSolutionInternalRow(puzzle, "W", Orientation.East, true, 2, 2),
    makeSolutionInternalRow(puzzle, "X", Orientation.North, false, 0, 0),
    makeSolutionInternalRow(puzzle, "Y", Orientation.North, false, 1, 4),
    makeSolutionInternalRow(puzzle, "Z", Orientation.North, false, 1, 3)
  ]
}

const makeSolutionInternalRow = (
  puzzle: Puzzle,
  label: string,
  orientation: Orientation,
  reflected: boolean,
  row: number,
  col: number
): InternalRow => {

  for (const pwv of piecesWithVariations) {
    if (pwv.label === label) {
      const variation = pwv.variations.find(v => v.orientation === orientation && v.reflected === reflected)
      if (variation) {
        const location = { row, col }
        return { puzzle, label, variation, location }
      }
    }
  }
  throw new Error("[makeSolutionInternalRow] failed to find variation")
}
