import { Puzzle } from "./puzzle";

export type InternalRow = {
  puzzle: Puzzle;
  cellId: number;
  value: number;
};
