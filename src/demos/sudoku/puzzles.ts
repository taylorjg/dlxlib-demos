import { InitialValue } from "./initial-value";
import { Puzzle } from "./puzzle";
import { range } from "utils";

const parseGrid = (grid: string[]): InitialValue[] =>
  grid.flatMap((gridRow, row) =>
    range(gridRow.length).flatMap((col) => {
      const ch = gridRow[col];
      const value = Number(ch);
      if (Number.isInteger(value) && value >= 1 && value <= 9) {
        const coords = { row, col };
        const initialValue = { coords, value };
        return [initialValue];
      }
      return [];
    })
  );

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
      "9 8 6 4 5",
    ]),
  },
  {
    name: "Daily Telegraph 27808",
    initialValues: parseGrid([
      "   8    7",
      "  6 9 1  ",
      "    14 3 ",
      "  75   18",
      "     89  ",
      "25       ",
      " 6 93    ",
      "  2 6 8  ",
      "4    7   ",
    ]),
  },
  {
    name: "Manchester Evening News 6th May 2016 No. 1",
    initialValues: parseGrid([
      "8   2 6  ",
      " 92  4  7",
      "4    6 8 ",
      "35  6   1",
      "92 7  45 ",
      "7 62  8  ",
      "  4   29 ",
      " 7 8 2  5",
      "   6  1 4",
    ]),
  },
  {
    name: "Manchester Evening News 6th May 2016 No. 2",
    initialValues: parseGrid([
      " 4 13   5",
      "1  25    ",
      "     6   ",
      "2        ",
      "6 8    5 ",
      " 9 6 1  2",
      "  7  8  1",
      "9       3",
      " 13  4 6 ",
    ]),
  },
  // https://abcnews.go.com/blogs/headlines/2012/06/can-you-solve-the-hardest-ever-sudoku
  {
    name: "World's hardest Sudoku",
    initialValues: parseGrid([
      "8        ",
      "  36     ",
      " 7  9 2  ",
      " 5   7   ",
      "    457  ",
      "   1   3 ",
      "  1    68",
      "  85   1 ",
      " 9    4  ",
    ]),
  },
];
