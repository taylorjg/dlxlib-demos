import { Coords } from "types"
import { Orientation } from "./orientation"

export type Variation = {
  orientation: Orientation,
  reflected: boolean,
  coordsList: Coords[]
}
