import { range, reverseString } from "utils";
import { Colour } from "./colour";
import { Square } from "./square";

export const rotateCW = (pattern: string[]): string[] => {
  const rowCount = pattern.length;
  const colCount = pattern[0].length;
  const rowIndices = range(rowCount);
  const colIndices = range(colCount);
  const transposed = colIndices.map((col) =>
    rowIndices.map((row) => pattern[row][col]).join("")
  );
  return reflect(transposed);
};

export const reflect = (pattern: string[]): string[] => {
  return pattern.map(reverseString);
};

export const toSquares = (pattern: string[]): Square[] => {
  const rowCount = pattern.length;
  const colCount = pattern[0].length;
  const squares: Square[] = [];

  for (const row of range(rowCount)) {
    for (const col of range(colCount)) {
      const coords = { row, col };
      switch (pattern[row][col]) {
        case "B":
          squares.push({ coords, colour: Colour.Black });
          break;
        case "W":
          squares.push({ coords, colour: Colour.White });
          break;
      }
    }
  }

  return squares;
};
