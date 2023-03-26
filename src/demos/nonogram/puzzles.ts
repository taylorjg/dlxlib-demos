import { Puzzle } from "./puzzle";
import { RunGroupType } from "./run-group-type";

const makePuzzle = (
  name: string,
  horizontalRunsData: number[][],
  verticalsRunsData: number[][]
): Puzzle => {
  const size = horizontalRunsData.length;
  const nameIncludingSize = `${name} (${size}x${size})`;

  const horizontalRunGroups = horizontalRunsData.map((lengths, row) => ({
    runGroupType: RunGroupType.Horizontal,
    lengths,
    row,
  }));

  const verticalRunGroups = verticalsRunsData.map((lengths, col) => ({
    runGroupType: RunGroupType.Vertical,
    lengths,
    col,
  }));

  return {
    name: nameIncludingSize,
    size,
    horizontalRunGroups,
    verticalRunGroups,
  };
};

export const puzzles = [
  // https://www.nonograms.org/nonograms/i/61360
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
      [3, 3],
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
      [3, 1],
    ]
  ),
  // https://www.nonograms.org/nonograms/i/2847
  makePuzzle(
    "Boat",
    [[1], [1], [2, 1], [2, 1], [3, 2], [4, 3], [5, 4], [1], [8], [6]],
    [[1], [2, 1], [3, 2], [5, 2], [7, 2], [3], [5, 2], [3, 2], [2, 1], [1]]
  ),
  // https://www.nonograms.org/nonograms/i/1268
  makePuzzle(
    "Charlie Chaplin",
    [
      [2, 5],
      [2, 7],
      [2, 7],
      [10],
      [14],
      [2, 1],
      [2, 2, 3],
      [1, 1, 1, 1],
      [1, 1],
      [1, 2, 1],
      [1, 2, 1],
      [1, 1, 3],
      [2, 1, 1, 1, 1],
      [4, 3, 1, 1],
      [6, 2, 1],
    ],
    [
      [1, 1],
      [1, 2],
      [8, 3],
      [7, 2, 3],
      [1, 2, 1, 2],
      [4, 1, 1, 1],
      [5, 2, 1],
      [5, 2, 1],
      [5, 2, 1],
      [5, 2, 1, 1],
      [5, 1, 1, 2],
      [9],
      [1, 4],
      [1, 2],
      [2],
    ]
  ),
  // https://www.nonograms.org/nonograms/i/17595
  makePuzzle(
    "Dog",
    [
      [3, 4],
      [1, 2, 3, 1],
      [2, 2, 3],
      [3, 1, 1],
      [2, 2, 2, 1],
      [2, 2, 1],
      [1, 3, 4],
      [2, 2],
      [1, 4],
      [1, 3],
      [1, 1],
      [2, 2, 2, 2],
      [4, 2, 3],
      [1, 3, 6],
      [6],
    ],
    [
      [5, 2],
      [1, 6, 2],
      [1, 1, 3, 3],
      [2, 1, 1, 3],
      [4, 2],
      [1, 1, 1],
      [1, 1, 1, 2, 1],
      [2, 3, 3],
      [3, 2, 2],
      [1, 2, 1, 1],
      [3, 3, 1, 1],
      [1, 1, 2],
      [1, 2, 2],
      [4, 2],
      [5],
    ]
  ),
  // https://www.gchq.gov.uk/information/director-gchq-s-christmas-puzzle-2015---part-1
  makePuzzle(
    "GCHQ's Christmas Puzzle 2015",
    [
      [7, 3, 1, 1, 7],
      [1, 1, 2, 2, 1, 1],
      [1, 3, 1, 3, 1, 1, 3, 1],
      [1, 3, 1, 1, 6, 1, 3, 1],
      [1, 3, 1, 5, 2, 1, 3, 1],
      [1, 1, 2, 1, 1],
      [7, 1, 1, 1, 1, 1, 7],
      [3, 3],
      [1, 2, 3, 1, 1, 3, 1, 1, 2],
      [1, 1, 3, 2, 1, 1],
      [4, 1, 4, 2, 1, 2],
      [1, 1, 1, 1, 1, 4, 1, 3],
      [2, 1, 1, 1, 2, 5],
      [3, 2, 2, 6, 3, 1],
      [1, 9, 1, 1, 2, 1],
      [2, 1, 2, 2, 3, 1],
      [3, 1, 1, 1, 1, 5, 1],
      [1, 2, 2, 5],
      [7, 1, 2, 1, 1, 1, 3],
      [1, 1, 2, 1, 2, 2, 1],
      [1, 3, 1, 4, 5, 1],
      [1, 3, 1, 3, 10, 2],
      [1, 3, 1, 1, 6, 6],
      [1, 1, 2, 1, 1, 2],
      [7, 2, 1, 2, 5],
    ],
    [
      [7, 2, 1, 1, 7],
      [1, 1, 2, 2, 1, 1],
      [1, 3, 1, 3, 1, 3, 1, 3, 1],
      [1, 3, 1, 1, 5, 1, 3, 1],
      [1, 3, 1, 1, 4, 1, 3, 1],
      [1, 1, 1, 2, 1, 1],
      [7, 1, 1, 1, 1, 1, 7],
      [1, 1, 3],
      [2, 1, 2, 1, 8, 2, 1],
      [2, 2, 1, 2, 1, 1, 1, 2],
      [1, 7, 3, 2, 1],
      [1, 2, 3, 1, 1, 1, 1, 1],
      [4, 1, 1, 2, 6],
      [3, 3, 1, 1, 1, 3, 1],
      [1, 2, 5, 2, 2],
      [2, 2, 1, 1, 1, 1, 1, 2, 1],
      [1, 3, 3, 2, 1, 8, 1],
      [6, 2, 1],
      [7, 1, 4, 1, 1, 3],
      [1, 1, 1, 1, 4],
      [1, 3, 1, 3, 7, 1],
      [1, 3, 1, 1, 1, 2, 1, 1, 4],
      [1, 3, 1, 4, 3, 3],
      [1, 1, 2, 2, 2, 6, 1],
      [7, 1, 3, 2, 1, 1],
    ]
  ),
];
