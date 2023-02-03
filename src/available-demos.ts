import { AvailableDemo } from "types";
import * as Sudoku from "demos/sudoku"
import * as NQueens from "demos/n-queens"
import * as Kakuro from "demos/kakuro"
import * as Placeholder from "demos/placeholder"

const demoNames = [
  "Sudoku",
  "Pentominoes",
  "Draughtboard Puzzle",
  "N Queens",
  "TetraSticks",
  "Aztec Diamond",
  "Ripple Effect",
  "Flow Free",
  "Kakuro",
  "Nonogram",
  "Crossword"
]

const thumbnailMap = new Map<string, React.FC>([
  ["sudoku", Sudoku.SudokuThumbnail],
  ["n-queens", NQueens.NQueensThumbnail],
  ["kakuro", Kakuro.KakuroThumbnail]
])

const makeShortName = (name: string): string => name.toLowerCase().replace(/\s/g, "-")

export const availableDemos: AvailableDemo[] = demoNames
  .map(name => {
    const shortName = makeShortName(name)
    return {
      name,
      shortName,
      Thumbnail: thumbnailMap.get(shortName) ?? Placeholder.PlaceholderThumbnail
    }
  })

export const lookupAvailableDemoByShortName = (shortName: string) => {
  return availableDemos.find(availableDemo => availableDemo.shortName === shortName)
}
