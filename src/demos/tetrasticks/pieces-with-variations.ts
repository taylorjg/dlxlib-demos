import { Orientation } from "./orientation"
import { Piece } from "./piece"
import { pieces } from "./pieces"
import { PieceWithVariations } from "./piece-with-variations"
import { normalisedRepresentation, reflect, rotateCW, Variation } from "./variation"

const findUniqueVariations = (piece: Piece): PieceWithVariations => {
  const north = {
    orientation: Orientation.North,
    reflected: false,
    horizontals: piece.horizontals,
    verticals: piece.verticals,
    junctions: piece.junctions,
    polyLines: piece.polyLines
  }
  const northReflected = reflect(north)

  const east = rotateCW(north)
  const eastReflected = reflect(east)

  const south = rotateCW(east)
  const southReflected = reflect(south)

  const west = rotateCW(south)
  const westReflected = reflect(west)

  const allVariations = [
    north, northReflected,
    east, eastReflected,
    south, southReflected,
    west, westReflected
  ]

  const representations = new Set<string>()
  const uniqueVariations: Variation[] = []
  allVariations.forEach(variation => {
    const representation = normalisedRepresentation(variation)
    if (!representations.has(representation)) {
      representations.add(representation)
      uniqueVariations.push(variation)
    }
  })

  return { label: piece.label, variations: uniqueVariations }
}

export const piecesWithVariations = pieces.map(findUniqueVariations)
