import { Point } from "types";

export class PathCommands {
  private pathCommands: string[];

  public constructor() {
    this.pathCommands = [];
  }

  public moveTo(point: Point): void {
    const { x, y } = point;
    this.pathCommands.push(`M${x},${y}`);
  }

  public lineTo(point: Point): void {
    const { x, y } = point;
    this.pathCommands.push(`L${x},${y}`);
  }

  public arcTo(
    point: Point,
    r: number,
    largeArcFlag: boolean,
    sweepFlag: boolean
  ): void {
    const { x, y } = point;
    const angle = 0;
    const largeArcFlagNumber = Number(largeArcFlag);
    const sweepFlagNumber = Number(sweepFlag);
    this.pathCommands.push(
      `A${r},${r},${angle},${largeArcFlagNumber},${sweepFlagNumber},${x},${y}`
    );
  }

  public close(): void {
    this.pathCommands.push("Z");
  }

  public toPathData(): string {
    return this.pathCommands.join(" ");
  }

  public static fromPoints(points: Point[]): PathCommands {
    const pathCommands = new PathCommands();
    const [firstPoint, ...remainingPoints] = points;
    pathCommands.moveTo(firstPoint);
    for (const point of remainingPoints) {
      pathCommands.lineTo(point);
    }
    pathCommands.close();
    return pathCommands;
  }
}
