import { last } from "utils"
import { DemoPage as GenericDemoPage } from "pages/demo-page"
import { Drawing } from "./drawing"
import { puzzles } from "./puzzles"

export const DemoPage = () => {

  const puzzle = last(puzzles)
  const drawingOptions = {}

  return (
    <GenericDemoPage
      initiallySelectedPuzzle={puzzle}
      initialDrawingOptions={drawingOptions}
      Drawing={Drawing}
    />
  )
}
