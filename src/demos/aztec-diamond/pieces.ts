import { Coords } from "types"
import { Piece } from "./piece"

const F = "H00 V00 H10 V10"
const F_POLYLINES = "0,1 0,0 1,0 1,1|1,1 1,0 2,0"

const H = "V00 V10 H10 V11"
const H_POLYLINES = "0,0 1,0 1,1 2,1|2,0 1,0 1,1 2,1"

const I = "V00 V10 V20 V30 I10 I20 I30"
const I_POLYLINES = "0,0 1,0 2,0 3,0 4,0"

const J = "V10 H20 V11 V01 I11"
const J_POLYLINES = "1,0 2,0 2,1 1,1 0,1"

const L = "V00 V10 V20 H30 I10 I20"
const L_POLYLINES = "0,0 1,0 2,0 3,0 3,1"

const N = "V20 H20 V01 V11 I11"
const N_POLYLINES = "3,0 2,0 2,1 1,1 0,1"

const O = "H00 V01 H10 V00"
const O_POLYLINES = "0,0 0,1 1,1 1,0 0,0"

const P = "H00 V01 H10 V10"
const P_POLYLINES = "0,0 0,1 1,1 1,0 2,0"

const R = "H10 V11 V01 H01"
const R_POLYLINES = "1,0 1,1 2,1|1,0 1,1 0,1 0,2"

const T = "H00 H01 V01 V11 I11"
const T_POLYLINES = "0,0 0,1 1,1 2,1|0,2 0,1 1,1 2,1"

const U = "V00 H10 H11 V02 I11"
const U_POLYLINES = "0,0 1,0 1,1 1,2 0,2"

const V = "V00 V10 H20 H21 I10 I21"
const V_POLYLINES = "0,0 1,0 2,0 2,1 2,2"

const W = "V00 H10 V11 H21"
const W_POLYLINES = "0,0 1,0 1,1 2,1 2,2"

const X = "V01 V11 H10 H11"
const X_POLYLINES = "1,0 1,1 0,1|0,1 1,1 1,2|1,2 1,1 2,1|2,1 1,1 1,0"

const Y = "H10 V01 V11 V21 I21"
const Y_POLYLINES = "1,0 1,1 0,1|1,0 1,1 2,1 3,1"

const Z = "H00 V01 V11 H21 I11"
const Z_POLYLINES = "0,0 0,1 1,1 2,1 2,2"

const parsePieceDescription = (
  label: string,
  pieceDescription: string,
  polyLineDescriptions: string
): Piece => {
  const horizontals: Coords[] = []
  const verticals: Coords[] = []
  const junctions: Coords[] = []
  const polyLines = parsePolyLineDescriptions(polyLineDescriptions)

  const bits = pieceDescription.split(/\s/).map(s => s.trim()).filter(Boolean)

  for (const bit of bits) {
    const type = bit[0]
    const row = Number(bit[1])
    const col = Number(bit[2])
    const coords = { row, col }
    switch (type) {
      case "H":
        horizontals.push(coords)
        break
      case "V":
        verticals.push(coords)
        break
      case "I":
        junctions.push(coords)
        break
    }
  }

  return { label, horizontals, verticals, junctions, polyLines: polyLines }
}

const parsePolyLineDescriptions = (polyLineDescriptions: string): Coords[][] => {
  return polyLineDescriptions
    .split("|")
    .map(s => s.trim())
    .filter(Boolean)
    .map(parsePolyLineDescription)
}

const parsePolyLineDescription = (polyLineDescription: string): Coords[] => {
  return polyLineDescription
    .split(/\s/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(coordsString => {
      const row = Number(coordsString[0])
      const col = Number(coordsString[2])
      return { row, col }
    })
}

export const twoSidedPieces = [
  parsePieceDescription("I", I, I_POLYLINES),
  parsePieceDescription("O", O, O_POLYLINES),
  parsePieceDescription("T", T, T_POLYLINES),
  parsePieceDescription("U", U, U_POLYLINES),
  parsePieceDescription("V", V, V_POLYLINES),
  parsePieceDescription("W", W, W_POLYLINES),
  parsePieceDescription("X", X, X_POLYLINES)
]

export const oneSidedPieces = [
  parsePieceDescription("F", F, F_POLYLINES),
  parsePieceDescription("H", H, H_POLYLINES),
  parsePieceDescription("J", J, J_POLYLINES),
  parsePieceDescription("L", L, L_POLYLINES),
  parsePieceDescription("N", N, N_POLYLINES),
  parsePieceDescription("P", P, P_POLYLINES),
  parsePieceDescription("R", R, R_POLYLINES),
  parsePieceDescription("Y", Y, Y_POLYLINES),
  parsePieceDescription("Z", Z, Z_POLYLINES)
]
