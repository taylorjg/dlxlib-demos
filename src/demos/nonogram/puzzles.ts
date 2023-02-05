import { range } from "utils";
import { Puzzle } from "./puzzle";
import { RunGroupType } from "./run-group-type";

export const puzzles: Puzzle[] = [
  {
    name: "fake",
    size: 10,
    horizontalRunGroups: range(10).map(row => ({
      runGroupType: RunGroupType.Horizontal,
      lengths: range(3),
      row
    })),
    verticalRunGroups: range(10).map(col => ({
      runGroupType: RunGroupType.Vertical,
      lengths: range(3),
      col
    })),
  }
]
