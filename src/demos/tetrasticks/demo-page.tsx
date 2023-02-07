import { DemoPage as GenericDemoPage } from "pages/demo-page"
import { Drawing } from "./drawing"

export const DemoPage = () => {

  const drawingOptions = {}

  return (
    <GenericDemoPage
      initiallySelectedPuzzle={{}}
      initialDrawingOptions={drawingOptions}
      Drawing={Drawing}
    />
  )
}
