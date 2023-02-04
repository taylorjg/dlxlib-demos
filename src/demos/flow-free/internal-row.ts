import { Coords } from "types"
import { ColourPair } from "./colour-pair"
import { Puzzle } from "./puzzle"

export type InternalRow = {
  puzzle: Puzzle,
  colourPair: ColourPair,
  pipe: Coords[]
}
