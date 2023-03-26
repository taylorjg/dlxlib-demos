import { Coords } from "types";
import { Piece } from "./piece";

const piecesMap = new Map<string, { lineSegments: string; polyLines: string }>([
  [
    "F",
    {
      lineSegments: "H00 V00 H10 V10",
      polyLines: "0,1 0,0 1,0 1,1|1,1 1,0 2,0",
    },
  ],
  [
    "H",
    {
      lineSegments: "V00 V10 H10 V11",
      polyLines: "0,0 1,0 1,1 2,1|2,0 1,0 1,1 2,1",
    },
  ],
  [
    "I",
    {
      lineSegments: "V00 V10 V20 V30 I10 I20 I30",
      polyLines: "0,0 1,0 2,0 3,0 4,0",
    },
  ],
  [
    "J",
    { lineSegments: "V10 H20 V11 V01 I11", polyLines: "1,0 2,0 2,1 1,1 0,1" },
  ],
  [
    "L",
    {
      lineSegments: "V00 V10 V20 H30 I10 I20",
      polyLines: "0,0 1,0 2,0 3,0 3,1",
    },
  ],
  [
    "N",
    { lineSegments: "V20 H20 V01 V11 I11", polyLines: "3,0 2,0 2,1 1,1 0,1" },
  ],
  ["O", { lineSegments: "H00 V01 H10 V00", polyLines: "0,0 0,1 1,1 1,0 0,0" }],
  ["P", { lineSegments: "H00 V01 H10 V10", polyLines: "0,0 0,1 1,1 1,0 2,0" }],
  [
    "R",
    {
      lineSegments: "H10 V11 V01 H01",
      polyLines: "1,0 1,1 2,1|1,0 1,1 0,1 0,2",
    },
  ],
  [
    "T",
    {
      lineSegments: "H00 H01 V01 V11 I11",
      polyLines: "0,0 0,1 1,1 2,1|0,2 0,1 1,1 2,1",
    },
  ],
  [
    "U",
    { lineSegments: "V00 H10 H11 V02 I11", polyLines: "0,0 1,0 1,1 1,2 0,2" },
  ],
  [
    "V",
    {
      lineSegments: "V00 V10 H20 H21 I10 I21",
      polyLines: "0,0 1,0 2,0 2,1 2,2",
    },
  ],
  ["W", { lineSegments: "V00 H10 V11 H21", polyLines: "0,0 1,0 1,1 2,1 2,2" }],
  [
    "X",
    {
      lineSegments: "V01 V11 H10 H11",
      polyLines: "1,0 1,1 0,1|0,1 1,1 1,2|1,2 1,1 2,1|2,1 1,1 1,0",
    },
  ],
  [
    "Y",
    {
      lineSegments: "H10 V01 V11 V21 I21",
      polyLines: "1,0 1,1 0,1|1,0 1,1 2,1 3,1",
    },
  ],
  [
    "Z",
    { lineSegments: "H00 V01 V11 H21 I11", polyLines: "0,0 0,1 1,1 2,1 2,2" },
  ],
]);

const parsePiece = (
  label: string,
  lineSegmentDescriptions: string,
  polyLineDescriptions: string
): Piece => {
  const horizontals: Coords[] = [];
  const verticals: Coords[] = [];
  const junctions: Coords[] = [];
  const polyLines = parsePolyLineDescriptions(polyLineDescriptions);

  const bits = lineSegmentDescriptions
    .split(/\s/)
    .map((s) => s.trim())
    .filter(Boolean);

  for (const bit of bits) {
    const type = bit[0];
    const row = Number(bit[1]);
    const col = Number(bit[2]);
    const coords = { row, col };
    switch (type) {
      case "H":
        horizontals.push(coords);
        break;
      case "V":
        verticals.push(coords);
        break;
      case "I":
        junctions.push(coords);
        break;
    }
  }

  return { label, horizontals, verticals, junctions, polyLines: polyLines };
};

const parsePolyLineDescriptions = (
  polyLineDescriptions: string
): Coords[][] => {
  return polyLineDescriptions
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parsePolyLineDescription);
};

const parsePolyLineDescription = (polyLineDescription: string): Coords[] => {
  return polyLineDescription
    .split(/\s/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((coordsString) => {
      const row = Number(coordsString[0]);
      const col = Number(coordsString[2]);
      return { row, col };
    });
};

export const pieces = Array.from(piecesMap).map(
  ([label, { lineSegments, polyLines }]) =>
    parsePiece(label, lineSegments, polyLines)
);
