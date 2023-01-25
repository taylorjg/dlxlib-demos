import { ColumnObject } from "./columnObject"

export class DataObject {

  public up: DataObject
  public down: DataObject
  public left: DataObject
  public right: DataObject

  public constructor(public listHeader?: ColumnObject, public rowIndex?: number) {
    this.up = this
    this.down = this
    this.left = this
    this.right = this
    listHeader?.addDataObject(this)
  }

  public appendToRow(dataObject: DataObject) {
    this.left.right = dataObject
    dataObject.right = this
    dataObject.left = this.left
    this.left = dataObject
  }

  public appendToColumn(dataObject: DataObject) {
    this.up.down = dataObject
    dataObject.down = this
    dataObject.up = this.up
    this.up = dataObject
  }

  public unlinkFromColumn() {
    this.down.up = this.up
    this.up.down = this.down
  }

  public relinkIntoColumn() {
    this.down.up = this
    this.up.down = this
  }

  public loopUp(fn: (dataObject: DataObject) => void) { this.loop(fn, "up") }
  public loopDown(fn: (dataObject: DataObject) => void) { this.loop(fn, "down") }
  public loopLeft(fn: (dataObject: DataObject) => void) { this.loop(fn, "left") }
  public loopRight(fn: (dataObject: DataObject) => void) { this.loop(fn, "right") }

  private loop(
    fn: (dataObject: DataObject) => void,
    propName: "up" | "down" | "left" | "right"
  ) {
    for (let next = this[propName]; next !== this; next = next[propName]) {
      fn(next)
    }
  }
}
