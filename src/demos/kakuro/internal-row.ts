import { Run } from "./run"
import { Puzzle } from "./puzzle"

export type KakuroInternalRow = {
  puzzle: Puzzle,
  run: Run,
  values: number[]  
}
