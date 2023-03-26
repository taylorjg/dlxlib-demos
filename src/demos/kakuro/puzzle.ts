import { Coords } from "types";
import { Clue } from "./clue";
import { Run } from "./run";

export type Puzzle = {
  size: number;
  blocks: Coords[];
  clues: Clue[];
  unknowns: Coords[];
  horizontalRuns: Run[];
  verticalRuns: Run[];
};
