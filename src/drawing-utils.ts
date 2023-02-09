import { Coords, sameCoords } from "types"
import { except, first, last } from "utils"

export type OutsideEdge = {
  coords1: Coords,
  coords2: Coords
}

const sameOutsideEdge = (outsideEdge1: OutsideEdge, outsideEdge2: OutsideEdge): boolean =>
  sameCoords(outsideEdge1.coords1, outsideEdge2.coords1) &&
  sameCoords(outsideEdge1.coords2, outsideEdge2.coords2)

export const gatherOutsideEdges = (coordsList: Coords[]): OutsideEdge[] => {

  const cellExistsAt = (row: number, col: number): boolean =>
    coordsList.some(coords => coords.row === row && coords.col === col)

  const makeOutsideEdge = (row1: number, col1: number, row2: number, col2: number): OutsideEdge =>
    ({ coords1: { row: row1, col: col1 }, coords2: { row: row2, col: col2 } })

  const outsideEdges: OutsideEdge[] = []

  for (const { row, col } of coordsList) {

    // top outside edge ?
    if (!cellExistsAt(row - 1, col)) {
      outsideEdges.push(makeOutsideEdge(row, col, row, col + 1))
    }

    // bottom outside edge ?
    if (!cellExistsAt(row + 1, col)) {
      outsideEdges.push(makeOutsideEdge(row + 1, col, row + 1, col + 1))
    }

    // left outside edge ?
    if (!cellExistsAt(row, col - 1)) {
      outsideEdges.push(makeOutsideEdge(row, col, row + 1, col))
    }

    // right outside edge ?
    if (!cellExistsAt(row, col + 1)) {
      outsideEdges.push(makeOutsideEdge(row, col + 1, row + 1, col + 1))
    }
  }

  return outsideEdges
}

export const outsideEdgesToBorderLocations = (outsideEdges: OutsideEdge[]): Coords[] => {
  const borderLocations: Coords[] = []
  const seenOutsideEdges: OutsideEdge[] = []

  const findNextOutsideEdge = (coords: Coords): OutsideEdge =>
    except(outsideEdges, seenOutsideEdges, sameOutsideEdge)
      .find(({ coords1, coords2 }) => sameCoords(coords1, coords) || sameCoords(coords2, coords))!

  const firstOutsideEdge = first(outsideEdges)
  borderLocations.push(firstOutsideEdge.coords1)
  borderLocations.push(firstOutsideEdge.coords2)
  seenOutsideEdges.push(firstOutsideEdge)

  for (; ;) {
    const firstLocation = first(borderLocations)
    const lastLocation = last(borderLocations)
    const nextOutsideEdge = findNextOutsideEdge(lastLocation)
    const nextLocation = sameCoords(nextOutsideEdge.coords1, lastLocation)
      ? nextOutsideEdge.coords2
      : nextOutsideEdge.coords1
    if (sameCoords(nextLocation, firstLocation)) break
    borderLocations.push(nextLocation)
    seenOutsideEdges.push(nextOutsideEdge)
  }

  return borderLocations
}
