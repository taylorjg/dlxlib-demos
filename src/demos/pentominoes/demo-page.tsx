import { DemoPage as GenericDemoPage } from "pages/demo-page";
import { DemoControls } from "./demo-controls";
import { Drawing } from "./drawing";

export const DemoPage = () => {
  const puzzle = {};
  const drawingOptions = { showLabels: false };

  return (
    <GenericDemoPage
      initiallySelectedPuzzle={puzzle}
      initialDrawingOptions={drawingOptions}
      Drawing={Drawing}
      DemoControls={DemoControls}
    />
  );
};
