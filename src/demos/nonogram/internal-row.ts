import { Coords } from "types"
import { Puzzle } from "./puzzle"
import { RunGroup } from "./run-group"

export type InternalRow = {
  puzzle: Puzzle,
  runGroup: RunGroup,
  CoordsLists: Coords[][]
}
