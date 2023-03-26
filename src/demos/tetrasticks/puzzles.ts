import { pieces } from "./pieces";
import { Puzzle } from "./puzzle";

export const puzzles: Puzzle[] = pieces
  .filter(
    (piece) =>
      piece.horizontals.length > 0 &&
      piece.verticals.length > 0 &&
      piece.horizontals.length !== piece.verticals.length
  )
  .map((piece) => ({ pieceToOmit: piece }));
