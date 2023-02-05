import { Puzzle } from "./puzzle"
import { RunGroupType } from "./run-group-type"

const makePuzzle = (
  name: string,
  horizontalRunsData: number[][],
  verticalsRunsData: number[][]
): Puzzle => {
  const size = horizontalRunsData.length
  const nameIncludingSize = `${name} (${size}x${size})`

  const horizontalRunGroups = horizontalRunsData.map((lengths, row) => ({
    runGroupType: RunGroupType.Horizontal,
    lengths,
    row
  }))

  const verticalRunGroups = verticalsRunsData.map((lengths, col) => ({
    runGroupType: RunGroupType.Vertical,
    lengths,
    col
  }))

  return { name: nameIncludingSize, size, horizontalRunGroups, verticalRunGroups }
}

export const puzzles = [
  makePuzzle(
    "Waving Figure",
    [
      [4],
      [1, 6],
      [1, 4],
      [2, 2],
      [8],
      [2, 2],
      [4, 1],
      [2, 2, 1],
      [1, 1],
      [3, 3]
    ],
    [
      [3, 1],
      [2, 1],
      [1, 1, 3],
      [3, 1, 2],
      [7],
      [7],
      [3, 1, 2],
      [1, 1, 3],
      [2, 1],
      [3, 1]
    ]
  )
]
