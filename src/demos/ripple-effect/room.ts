import { Coords } from "types"
import { InitialValue } from "./initial-value"

export type Room = {
  label: string,
  cells: Coords[],
  initialValues: InitialValue[],
  startIndex: number
}
