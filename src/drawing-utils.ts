import { PathCommands } from "path-commands";
import { Coords, Point, sameCoords } from "types";
import { except, first, last } from "utils";

export const inset = (
  x: number,
  y: number,
  width: number,
  height: number,
  factor: number
): {
  x: number;
  y: number;
  width: number;
  height: number;
} => {
  const fx = width * factor;
  const fy = height * factor;
  return {
    x: x + fx,
    y: y + fy,
    width: width - 2 * fx,
    height: height - 2 * fy,
  };
};

export type OutsideEdge = {
  coords1: Coords;
  coords2: Coords;
};

const sameOutsideEdge = (
  outsideEdge1: OutsideEdge,
  outsideEdge2: OutsideEdge
): boolean =>
  sameCoords(outsideEdge1.coords1, outsideEdge2.coords1) &&
  sameCoords(outsideEdge1.coords2, outsideEdge2.coords2);

export const gatherOutsideEdges = (
  coordsList: Coords[],
  location?: Coords
): OutsideEdge[] => {
  const cellExistsAt = (row: number, col: number): boolean =>
    coordsList.some((coords) => coords.row === row && coords.col === col);

  const makeOutsideEdge = (
    row1: number,
    col1: number,
    row2: number,
    col2: number
  ): OutsideEdge =>
    location
      ? {
          coords1: { row: row1 + location.row, col: col1 + location.col },
          coords2: { row: row2 + location.row, col: col2 + location.col },
        }
      : {
          coords1: { row: row1, col: col1 },
          coords2: { row: row2, col: col2 },
        };

  const outsideEdges: OutsideEdge[] = [];

  for (const { row, col } of coordsList) {
    // top outside edge ?
    if (!cellExistsAt(row - 1, col)) {
      outsideEdges.push(makeOutsideEdge(row, col, row, col + 1));
    }

    // bottom outside edge ?
    if (!cellExistsAt(row + 1, col)) {
      outsideEdges.push(makeOutsideEdge(row + 1, col, row + 1, col + 1));
    }

    // left outside edge ?
    if (!cellExistsAt(row, col - 1)) {
      outsideEdges.push(makeOutsideEdge(row, col, row + 1, col));
    }

    // right outside edge ?
    if (!cellExistsAt(row, col + 1)) {
      outsideEdges.push(makeOutsideEdge(row, col + 1, row + 1, col + 1));
    }
  }

  return outsideEdges;
};

export const outsideEdgesToBorderLocations = (
  outsideEdges: OutsideEdge[]
): Coords[] => {
  const borderLocations: Coords[] = [];
  const seenOutsideEdges: OutsideEdge[] = [];

  const findNextOutsideEdge = (coords: Coords): OutsideEdge => {
    const unseenOutsideEdges = except(
      outsideEdges,
      seenOutsideEdges,
      sameOutsideEdge
    );
    const nextOutsideEdge = unseenOutsideEdges.find(
      ({ coords1, coords2 }) =>
        sameCoords(coords1, coords) || sameCoords(coords2, coords)
    );
    if (!nextOutsideEdge) {
      throw new Error(`[findNextOutsideEdge] failed to find next outside edge`);
    }
    return nextOutsideEdge;
  };

  const firstOutsideEdge = first(outsideEdges);
  borderLocations.push(firstOutsideEdge.coords1);
  borderLocations.push(firstOutsideEdge.coords2);
  seenOutsideEdges.push(firstOutsideEdge);

  for (;;) {
    const firstLocation = first(borderLocations);
    const lastLocation = last(borderLocations);
    const nextOutsideEdge = findNextOutsideEdge(lastLocation);
    const nextLocation = sameCoords(nextOutsideEdge.coords1, lastLocation)
      ? nextOutsideEdge.coords2
      : nextOutsideEdge.coords1;
    if (sameCoords(nextLocation, firstLocation)) break;
    borderLocations.push(nextLocation);
    seenOutsideEdges.push(nextOutsideEdge);
  }

  return borderLocations;
};

export const collapseLocations = (locations: Coords[]): Coords[] => {
  return locations.filter((location, index) => {
    const locationBefore = index === 0 ? last(locations) : locations[index - 1];
    const locationAfter = locations[(index + 1) % locations.length];
    const directionBefore = determineDirectionFromCoords(
      locationBefore,
      location
    );
    const directionAfter = determineDirectionFromCoords(
      location,
      locationAfter
    );
    return directionBefore !== directionAfter;
  });
};

const isInnerArc = (points: Point[], index: number): boolean => {
  const point = points[index];
  const pointBefore = index === 0 ? last(points) : points[index - 1];
  const pointAfter = points[(index + 1) % points.length];
  const directionBefore = determineDirectionFromPoints(pointBefore, point);
  const directionAfter = determineDirectionFromPoints(point, pointAfter);
  const directions = directionBefore + directionAfter;
  return ["RD", "DL", "LU", "UR"].includes(directions);
};

const adjustLineStartPoint = (
  points: Point[],
  index: number,
  gap: number
): Point => {
  const maybeGap = isInnerArc(points, index) ? gap : 0;
  const halfGap = gap / 2;
  const point1 = points[index];
  const point2 = points[(index + 1) % points.length];
  const { x, y } = point1;
  const direction = determineDirectionFromPoints(point1, point2);
  switch (direction) {
    case "U":
      return { x: x + halfGap, y: y - maybeGap };
    case "D":
      return { x: x - halfGap, y: y + maybeGap };
    case "L":
      return { x: x - maybeGap, y: y - halfGap };
    case "R":
      return { x: x + maybeGap, y: y + halfGap };
  }
  throw new Error("[adjustLineStartPoint] unexpected situation!");
};

const adjustLineEndPoint = (
  points: Point[],
  index: number,
  gap: number
): Point => {
  const nextIndex = (index + 1) % points.length;
  const maybeGap = isInnerArc(points, nextIndex) ? gap : 0;
  const halfGap = gap / 2;
  const point1 = points[index];
  const point2 = points[nextIndex];
  const { x, y } = point2;
  const direction = determineDirectionFromPoints(point1, point2);
  switch (direction) {
    case "U":
      return { x: x + halfGap, y: y + maybeGap };
    case "D":
      return { x: x - halfGap, y: y - maybeGap };
    case "L":
      return { x: x + maybeGap, y: y - halfGap };
    case "R":
      return { x: x - maybeGap, y: y + halfGap };
  }
  throw new Error("[adjustLineStartPoint] unexpected situation!");
};

export const createBorderPathData = (points: Point[], gap: number): string => {
  const adjustedPoints: Point[] = [];

  for (let index = 0; index < points.length; index++) {
    adjustedPoints.push(adjustLineStartPoint(points, index, gap));
    adjustedPoints.push(adjustLineEndPoint(points, index, gap));
  }

  const pathCommands = new PathCommands();

  pathCommands.moveTo(adjustedPoints[0]);
  adjustedPoints.push(adjustedPoints[0]);

  for (let index = 1; index < adjustedPoints.length; index++) {
    const point = adjustedPoints[index];
    if (index % 2 === 1) {
      pathCommands.lineTo(point);
    } else {
      const r = gap / 2;
      const largeArcFlag = false;
      const sweepFlag = isInnerArc(points, (index / 2) % points.length);
      pathCommands.arcTo(point, r, largeArcFlag, sweepFlag);
    }
  }

  return pathCommands.toPathData();
};

const determineDirectionFromCoords = (
  coords1: Coords,
  coords2: Coords
): string => {
  if (coords1.col === coords2.col) return coords2.row > coords1.row ? "D" : "U";
  if (coords1.row === coords2.row) return coords2.col > coords1.col ? "R" : "L";
  throw new Error("[determineDirectionFromCoords] unexpected situation!");
};

const determineDirectionFromPoints = (point1: Point, point2: Point): string => {
  const withinTolerance = (value: number) => Math.abs(value) <= 1e-3;
  if (withinTolerance(point1.x - point2.x))
    return point2.y > point1.y ? "D" : "U";
  if (withinTolerance(point1.y - point2.y))
    return point2.x > point1.x ? "R" : "L";
  throw new Error("[determineDirectionFromPoints] unexpected situation!");
};
