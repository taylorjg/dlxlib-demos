import { Coords } from "types";
import { range, reverseString } from "utils";

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

export const toCoordsList = (pattern: string[]): Coords[] => {
  const rowCount = pattern.length;
  const colCount = pattern[0].length;
  const coordsList: Coords[] = [];

  for (const row of range(rowCount)) {
    for (const col of range(colCount)) {
      if (pattern[row][col] === "X") {
        const coords = { row, col };
        coordsList.push(coords);
      }
    }
  }

  return coordsList;
};
