import { Orientation } from "./orientation"
import { reflect, rotateCW, toCoordsList } from "./pattern"
import { Piece } from "./piece"
import { PieceWithVariations } from "./piece-with-variations"
import { pieces } from "./pieces"
import { Variation } from "./variation"

type VariationCandidate = {
  orientation: Orientation,
  reflected: boolean,
  pattern: string[]
}

const reflectVariationCandidate = (vc: VariationCandidate): VariationCandidate => {
  return {
    ...vc,
    reflected: true,
    pattern: reflect(vc.pattern)
  }
}

const makeVariation = (vc: VariationCandidate): Variation => ({
  orientation: vc.orientation,
  reflected: vc.reflected,
  coordsList: toCoordsList(vc.pattern)
})

const findUniqueVariations = (piece: Piece): PieceWithVariations => {
  const { label, pattern } = piece

  const north = { orientation: Orientation.North, reflected: false, pattern }
  const northReflected = reflectVariationCandidate(north)

  const east = { orientation: Orientation.East, reflected: false, pattern: rotateCW(north.pattern) }
  const eastReflected = reflectVariationCandidate(east)

  const south = { orientation: Orientation.South, reflected: false, pattern: rotateCW(east.pattern) }
  const southReflected = reflectVariationCandidate(south)

  const west = { orientation: Orientation.West, reflected: false, pattern: rotateCW(south.pattern) }
  const westReflected = reflectVariationCandidate(west)

  const allVariationCandidates = [
    north, northReflected,
    east, eastReflected,
    south, southReflected,
    west, westReflected
  ]

  const representations = new Set<string>()
  const uniqueVariationCandidates: VariationCandidate[] = []
  for (const vc of allVariationCandidates) {
    const representation = vc.pattern.join("|")
    if (!representations.has(representation)) {
      representations.add(representation)
      uniqueVariationCandidates.push(vc)
    }
  }

  const variations = uniqueVariationCandidates.map(makeVariation)

  return { label, variations }
}

export const piecesWithVariations = pieces.map(findUniqueVariations)
