import { Coords } from "types";
import { range } from "utils";
import { ColourPair } from "./colour-pair";
import { Puzzle } from "./puzzle";

const parsePuzzle = (name: string, grid: string[]): Puzzle => {
  const size = grid.length
  const dict = new Map<string, Coords[]>()

  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col]
      if (/[A-Z]/.test(ch)) {
        const coords = { row, col }
        if (dict.has(ch)) {
          dict.get(ch)?.push(coords)
        } else {
          dict.set(ch, [coords])
        }
      }
    }
  }

  const colourPairs: ColourPair[] = []

  for (const [label, coordsList] of dict) {
    if (coordsList.length === 2) {
      const [start, end] = coordsList
      const colourPair = { label, start, end }
      colourPairs.push(colourPair)
    }
  }

  return { name, size, colourPairs }
}

export const puzzles = [
  // Size 5 puzzles
  parsePuzzle(
    "Puzzle 1 (5x5)",
    [
      "C--AE",
      "---D-",
      "--D--",
      "-AE-B",
      "-CB--"
    ]
  ),
  parsePuzzle(
    "Puzzle 2 (5x5)",
    [
      "---AB",
      "--CB-",
      "A----",
      "EC-DE",
      "----D"
    ]
  ),

  // Size 6 puzzles
  parsePuzzle(
    "Puzzle 1 (6x6)",
    [
      "-----E",
      "------",
      "-DA---",
      "---B-D",
      "-B-EAC",
      "---C--"
    ]
  ),
  parsePuzzle(
    "Puzzle 2 (6x6)",
    [
      "---C-D",
      "---B-C",
      "--AD--",
      "------",
      "---BA-",
      "------"
    ]
  ),

  // Size 7 puzzles
  parsePuzzle(
    "Puzzle 1 (7x7)",
    [
      "-------",
      "CD---FB",
      "EC----A",
      "--D----",
      "-----F-",
      "---E-B-",
      "A------"
    ]
  ),
  parsePuzzle(
    "Puzzle 2 (7x7)",
    [
      "F-----A",
      "E-EFA-C",
      "------B",
      "-------",
      "-B-----",
      "-D---C-",
      "----D--"
    ]
  ),

  // Size 8 puzzles
  parsePuzzle(
    "Puzzle 1 (8x8)",
    [
      "F--FD---",
      "--AIG-G-",
      "--C-----",
      "--B-EH--",
      "----I---",
      "---A----",
      "-C-B--ED",
      "-------H"
    ]

  ),
  parsePuzzle(
    "Puzzle 2 (8x8)",
    [
      "-C-----D",
      "-H----E-",
      "----F-B-",
      "---B--D-",
      "---CA---",
      "-HE---A-",
      "----F---",
      "G------G"
    ]
  ),

  // Size 9 puzzles
  parsePuzzle(
    "Puzzle 1 (9x9)",
    [
      "C--------",
      "---------",
      "---A-----",
      "--H--E---",
      "-----F---",
      "C-EF-G---",
      "B--D-----",
      "-G---B-H-",
      "-------AD"
    ]
  ),
  parsePuzzle(
    "Puzzle 2 (9x9)",
    [
      "------A-A",
      "-------GB",
      "--B------",
      "------D--",
      "-F-------",
      "---------",
      "--------G",
      "EDFC----C",
      "--------E"
    ]
  ),

  // Size 10 puzzles
  parsePuzzle(
    "Puzzle 1 (10x10)",
    [
      "----------",
      "----------",
      "-------D--",
      "-FD-----F-",
      "-E---BI-C-",
      "-----G----",
      "--AIG-----",
      "---------H",
      "-B-E-----C",
      "-H-------A"
    ]
  ),
  parsePuzzle(
    "Puzzle 2 (10x10)",
    [
      "----------",
      "-H--------",
      "------EA--",
      "C--BJ-----",
      "----------",
      "FB--F-----",
      "--I--J-AH-",
      "----------",
      "-GD-D--GE-",
      "-------IC-"
    ]
  )
]
