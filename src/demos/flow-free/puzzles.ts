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
  )
]
