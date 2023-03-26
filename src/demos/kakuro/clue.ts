import { Coords } from "types";

export type Clue = {
  coords: Coords;
  acrossSum?: number;
  downSum?: number;
};
