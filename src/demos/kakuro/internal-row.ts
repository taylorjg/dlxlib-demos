import { Run } from "./run"
import { Puzzle } from "./puzzle"

export type InternalRow = {
  puzzle: Puzzle,
  run: Run,
  values: number[]  
}
