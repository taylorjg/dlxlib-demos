import { Clue } from "./clue"
import { Puzzle } from "./puzzle"

export type InternalRow = {
  puzzle: Puzzle,
  clue: Clue,
  candidate: string
}
