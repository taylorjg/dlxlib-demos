import { DataObject } from "./dataObject"

export class ColumnObject extends DataObject {

  public previousColumnObject: ColumnObject
  public nextColumnObject: ColumnObject
  public numberOfRows: number

  public constructor() {
    super()
    this.previousColumnObject = this
    this.nextColumnObject = this
    this.numberOfRows = 0
  }

  public appendColumnHeader(columnObject: ColumnObject) {
    this.previousColumnObject.nextColumnObject = columnObject
    columnObject.nextColumnObject = this
    columnObject.previousColumnObject = this.previousColumnObject
    this.previousColumnObject = columnObject
  }

  public unlinkColumnHeader() {
    this.nextColumnObject.previousColumnObject = this.previousColumnObject
    this.previousColumnObject.nextColumnObject = this.nextColumnObject
  }

  public relinkColumnHeader() {
    this.nextColumnObject.previousColumnObject = this
    this.previousColumnObject.nextColumnObject = this
  }

  public addDataObject(dataObject: DataObject) {
    this.appendToColumn(dataObject)
    this.numberOfRows++
  }

  public unlinkDataObject(dataObject: DataObject) {
    dataObject.unlinkFromColumn()
    this.numberOfRows--
  }

  public relinkDataObject(dataObject: DataObject) {
    dataObject.relinkIntoColumn()
    this.numberOfRows++
  }

  public loopNext(fn: (columnObject: ColumnObject) => void) {
    for (let next = this.nextColumnObject; next !== this; next = next.nextColumnObject) {
      fn(next)
    }
  }
}
