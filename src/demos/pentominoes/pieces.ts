// https://en.wikipedia.org/wiki/Pentomino

import { Piece } from "./piece";

const F = [
  " XX",
  "XX ",
  " X "
]

const I = [
  "X",
  "X",
  "X",
  "X",
  "X"
]

const L = [
  "X ",
  "X ",
  "X ",
  "XX"
]

const N = [
  " X",
  " X",
  "XX",
  "X "
]

const P = [
  "XX",
  "XX",
  "X "
]

const T = [
  "XXX",
  " X ",
  " X "
]

const U = [
  "X X",
  "XXX"
]

const V = [
  "X  ",
  "X  ",
  "XXX"
]

const W = [
  "X  ",
  "XX ",
  " XX"
]

const X = [
  " X ",
  "XXX",
  " X "
]

const Y = [
  " X",
  "XX",
  " X",
  " X"
]

const Z = [
  "XX ",
  " X ",
  " XX"
]

const makePiece = (label: string, pattern: string[]): Piece => ({ label, pattern })

export const pieces = [
  makePiece("F", F),
  makePiece("I", I),
  makePiece("L", L),
  makePiece("N", N),
  makePiece("P", P),
  makePiece("T", T),
  makePiece("U", U),
  makePiece("V", V),
  makePiece("W", W),
  makePiece("X", X),
  makePiece("Y", Y),
  makePiece("Z", Z)
]
