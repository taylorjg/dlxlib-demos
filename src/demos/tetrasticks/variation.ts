import { Coords, coordsComparer } from "types";
import { maxBy } from "utils";
import { Orientation, rotateCW as rotateOrientationCW } from "./orientation";

export type Variation = {
  orientation: Orientation;
  reflected: boolean;
  horizontals: Coords[];
  verticals: Coords[];
  junctions: Coords[];
  polyLines: Coords[][];
};

export const getDimensions = (
  variation: Variation
): { width: number; height: number } => {
  const width = variation.horizontals.length
    ? maxBy(variation.horizontals, (h) => h.col) + 1
    : 0;
  const height = variation.verticals.length
    ? maxBy(variation.verticals, (v) => v.row) + 1
    : 0;
  return { width, height };
};

export const reflect = (variation: Variation): Variation => {
  const { width } = getDimensions(variation);
  const newHorizontals = variation.horizontals.map((c) => ({
    row: c.row,
    col: width - c.col - 1,
  }));
  const newVerticals = variation.verticals.map((c) => ({
    row: c.row,
    col: width - c.col,
  }));
  const newJunctions = variation.junctions.map((c) => ({
    row: c.row,
    col: width - c.col,
  }));
  const newPolyLines = variation.polyLines.map((polyLine) =>
    polyLine.map((c) => ({ row: c.row, col: width - c.col }))
  );

  return {
    orientation: variation.orientation,
    reflected: !variation.reflected,
    horizontals: newHorizontals,
    verticals: newVerticals,
    junctions: newJunctions,
    polyLines: newPolyLines,
  };
};

export const rotateCW = (variation: Variation): Variation => {
  const { height } = getDimensions(variation);
  const newHorizontals = variation.verticals.map((c) => ({
    row: c.col,
    col: height - c.row - 1,
  }));
  const newVerticals = variation.horizontals.map((c) => ({
    row: c.col,
    col: height - c.row,
  }));
  const newJunctions = variation.junctions.map((c) => ({
    row: c.col,
    col: height - c.row,
  }));
  const newPolyLines = variation.polyLines.map((polyLine) =>
    polyLine.map((c) => ({ row: c.col, col: height - c.row }))
  );

  return {
    orientation: rotateOrientationCW(variation.orientation),
    reflected: variation.reflected,
    horizontals: newHorizontals,
    verticals: newVerticals,
    junctions: newJunctions,
    polyLines: newPolyLines,
  };
};

export const normalisedRepresentation = (variation: Variation): string => {
  const sortedHorizontals = variation.horizontals.slice().sort(coordsComparer);
  const sortedVerticals = variation.verticals.slice().sort(coordsComparer);
  const hs = sortedHorizontals.map((coords) => `H${coords.row}:${coords.col}`);
  const vs = sortedVerticals.map((coords) => `V${coords.row}:${coords.col}`);
  return hs.concat(vs).join("-");
};
