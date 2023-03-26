import { Piece } from "./piece";

// https://en.wikipedia.org/wiki/Pentomino
const piecesMap = new Map<string, string[]>([
  ["F", [" XX", "XX ", " X "]],
  ["I", ["X", "X", "X", "X", "X"]],
  ["L", ["X ", "X ", "X ", "XX"]],
  ["N", [" X", " X", "XX", "X "]],
  ["P", ["XX", "XX", "X "]],
  ["T", ["XXX", " X ", " X "]],
  ["U", ["X X", "XXX"]],
  ["V", ["X  ", "X  ", "XXX"]],
  ["W", ["X  ", "XX ", " XX"]],
  ["X", [" X ", "XXX", " X "]],
  ["Y", [" X", "XX", " X", " X"]],
  ["Z", ["XX ", " X ", " XX"]],
]);

export const pieces: Piece[] = Array.from(piecesMap).map(
  ([label, pattern]) => ({ label, pattern })
);
