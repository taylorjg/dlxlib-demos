import { Orientation } from "./orientation";
import { Piece } from "./piece";
import { twoSidedPieces, oneSidedPieces } from "./pieces";
import { PieceWithVariations } from "./piece-with-variations";
import {
  normalisedRepresentation,
  reflect,
  rotateCW,
  Variation,
} from "./variation";

const makeVariations = (
  piece: Piece,
  wantReflected: boolean
): PieceWithVariations => {
  const baseVariation = {
    orientation: Orientation.North,
    reflected: false,
    horizontals: piece.horizontals,
    verticals: piece.verticals,
    junctions: piece.junctions,
    polyLines: piece.polyLines,
  };

  const north = wantReflected ? reflect(baseVariation) : baseVariation;
  const east = rotateCW(north);
  const south = rotateCW(east);
  const west = rotateCW(south);

  const allVariations = [north, east, south, west];

  const representations = new Set<string>();
  const uniqueVariations: Variation[] = [];
  allVariations.forEach((variation) => {
    const representation = normalisedRepresentation(variation);
    if (!representations.has(representation)) {
      representations.add(representation);
      uniqueVariations.push(variation);
    }
  });

  return { label: piece.label, variations: uniqueVariations };
};

const makeUnreflectedVariations = (piece: Piece) =>
  makeVariations(piece, false);
const makeReflectedVariations = (piece: Piece) => makeVariations(piece, true);

export const piecesWithVariations: PieceWithVariations[] = twoSidedPieces
  .map(makeUnreflectedVariations)
  .concat(oneSidedPieces.map(makeUnreflectedVariations))
  .concat(oneSidedPieces.map(makeReflectedVariations));
