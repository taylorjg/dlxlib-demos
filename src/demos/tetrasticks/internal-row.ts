import { Coords } from "types";
import { Puzzle } from "./puzzle";
import { Variation } from "./variation";

export type InternalRow = {
  puzzle: Puzzle;
  label: string;
  variation: Variation;
  location: Coords;
};
