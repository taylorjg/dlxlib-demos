import { Coords } from "types"
import { Variation } from "./variation"

export type InternalRow = {
  label: string,
  variation: Variation,
  location: Coords
}
