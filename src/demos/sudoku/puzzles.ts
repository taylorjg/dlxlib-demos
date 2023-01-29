import { InitialValue } from "./initial-value"
import { Puzzle } from "./puzzle"
import { range } from "utils"

const parseGrid = (grid: string[]): InitialValue[] =>
  grid.flatMap((gridRow, row) =>
    range(gridRow.length).flatMap((col) => {
      const ch = gridRow[col]
      const value = Number(ch)
      if (Number.isInteger(value) && value >= 1 && value <= 9) {
        const coords = { row, col }
        const initialValue = { coords, value }
        return [initialValue]
      }
      return []
    }))

export const puzzles: Puzzle[] = [
  {
    name: "Daily Telegraph 27744",
    initialValues: parseGrid([
      "6 4 9 7 3",
      "  3    6 ",
      "       18",
      "   18   9",
      "     43  ",
      "7   39   ",
      " 7       ",
      " 4    8  ",
      "9 8 6 4 5"
    ])
  }
]
