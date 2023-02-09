import { Coords } from "types"
import { Clue } from "./clue"

export type Puzzle = {
  name: string,
  size: number,
  blocks: Coords[],
  clues: Clue[],
  crossCheckingSquares: Coords[]
}
