import { DemoPage as GenericDemoPage } from "pages/demo-page"
import { Drawing } from "./drawing"

export const DemoPage = () => {

  const puzzle = {}
  const drawingOptions = {}

  return (
    <GenericDemoPage
      initiallySelectedPuzzle={puzzle}
      initialDrawingOptions={drawingOptions}
      Drawing={Drawing}
    />
  )
}
