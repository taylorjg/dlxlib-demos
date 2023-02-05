import { HorizontalRunGroup } from "./horizontal-run-group"
import { VerticalRunGroup } from "./vertical-run-group"

export type Puzzle = {
  name: string,
  size: number,
  horizontalRunGroups: HorizontalRunGroup[],
  verticalRunGroups: VerticalRunGroup[]
}
