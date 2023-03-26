import { Coords } from "types";

export type Piece = {
  label: string;
  horizontals: Coords[];
  verticals: Coords[];
  junctions: Coords[];
  polyLines: Coords[][];
};
