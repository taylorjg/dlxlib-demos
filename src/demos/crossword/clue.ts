import { Coords } from "types";
import { ClueType } from "./clue-type";

export type Clue = {
  clueType: ClueType,
  clueNumber: number,
  coordsList: Coords[],
  candidates: string[]
}
