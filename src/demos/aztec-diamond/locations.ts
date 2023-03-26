import { Coords, goLeft, sameCoords } from "types";
import { range } from "utils";

export const allHorizontals: Coords[] = range(10)
  .flatMap((row) => range(9).map((col) => ({ row, col })))
  .filter(({ row, col }) => {
    const centreRelativeRow = row - 4.5;
    const centreRelativeCol = col - 4.0;
    return Math.abs(centreRelativeRow) + Math.abs(centreRelativeCol) <= 5;
  });

export const allVerticals: Coords[] = range(9)
  .flatMap((row) => range(10).map((col) => ({ row, col })))
  .filter(({ row, col }) => {
    const centreRelativeRow = row - 4.0;
    const centreRelativeCol = col - 4.5;
    return Math.abs(centreRelativeRow) + Math.abs(centreRelativeCol) <= 5;
  });

export const allJunctions: Coords[] = allHorizontals.filter((h1) =>
  allHorizontals.some((h2) => sameCoords(goLeft(h1), h2))
);

export const allLocations: Coords[] = allHorizontals.concat(
  allVerticals.filter((v) => !allHorizontals.some((h) => sameCoords(v, h)))
);
