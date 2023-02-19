import { Point } from "types"

export class PathCommands {

  private pathCommands: string[]

  constructor() {
    this.pathCommands = []
  }

  moveTo(point: Point): void {
    const { x, y } = point
    this.pathCommands.push(`M${x},${y}`)
  }

  lineTo(point: Point): void {
    const { x, y } = point
    this.pathCommands.push(`L${x},${y}`)
  }

  arcTo(point: Point, r: number, largeArcFlag: boolean, sweepFlag: boolean): void {
    const { x, y } = point
    const angle = 0
    const largeArcFlagNumber = Number(largeArcFlag)
    const sweepFlagNumber = Number(sweepFlag)
    this.pathCommands.push(`A${r},${r},${angle},${largeArcFlagNumber},${sweepFlagNumber}${x},${y}`)
  }

  close(): void {
    this.pathCommands.push("Z")
  }

  setPoints(points: Point[]): void {
    const [firstPoint, ...remainingPoints] = points
    this.moveTo(firstPoint)
    for (const point of remainingPoints) {
      this.lineTo(point)
    }
    this.close()
  }

  toPathData(): string {
    return this.pathCommands.join(" ")
  }
}
