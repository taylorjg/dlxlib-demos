import { sameCoordsList } from "types"
import { Coords } from "types"
import { RunType } from "./run-type"

export type Run = {
  runType: RunType,
  coordsList: Coords[],
  sum: number
}

export const sameRun = (run1: Run, run2: Run): boolean => {
  return (
    run1.runType === run2.runType &&
    run1.sum === run2.sum &&
    sameCoordsList(run1.coordsList, run2.coordsList)
  )
}
