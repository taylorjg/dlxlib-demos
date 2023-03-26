import { Orientation } from "./orientation";
import { rotateCW, toSquares } from "./pattern";
import { Piece } from "./piece";
import { PieceWithVariations } from "./piece-with-variations";
import { pieces } from "./pieces";
import { Variation } from "./variation";

type VariationCandidate = {
  orientation: Orientation;
  pattern: string[];
};

const makeVariation = (vc: VariationCandidate): Variation => ({
  orientation: vc.orientation,
  squares: toSquares(vc.pattern),
});

const findUniqueVariations = (piece: Piece): PieceWithVariations => {
  const { label, pattern } = piece;

  const north = { orientation: Orientation.North, pattern };
  const east = {
    orientation: Orientation.East,
    pattern: rotateCW(north.pattern),
  };
  const south = {
    orientation: Orientation.South,
    pattern: rotateCW(east.pattern),
  };
  const west = {
    orientation: Orientation.West,
    pattern: rotateCW(south.pattern),
  };

  const allVariationCandidates = [north, east, south, west];

  const representations = new Set<string>();
  const uniqueVariationCandidates: VariationCandidate[] = [];
  for (const vc of allVariationCandidates) {
    const representation = vc.pattern.join("|");
    if (!representations.has(representation)) {
      representations.add(representation);
      uniqueVariationCandidates.push(vc);
    }
  }

  const variations = uniqueVariationCandidates.map(makeVariation);

  return { label, variations };
};

export const piecesWithVariations = pieces.map(findUniqueVariations);
