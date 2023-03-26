export enum Orientation {
  North,
  South,
  East,
  West,
}

export const rotateCW = (orientation: Orientation): Orientation => {
  switch (orientation) {
    case Orientation.North:
      return Orientation.East;
    case Orientation.South:
      return Orientation.West;
    case Orientation.East:
      return Orientation.South;
    case Orientation.West:
      return Orientation.North;
  }
};
