import { Coords } from "types";
import { Puzzle } from "./puzzle";
import { Room } from "./room";

export type InternalRow = {
  puzzle: Puzzle;
  cell: Coords;
  value: number;
  isInitialValue: boolean;
  room: Room;
};
