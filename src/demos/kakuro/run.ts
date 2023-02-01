import { Coords } from "types"
import { RunType } from "./run-type"

export type Run = {
  runType: RunType,
  coordsList: Coords[],
  sum: number
}
