import { DemoPage as GenericDemoPage } from "pages/demo-page";
import { Drawing } from "./drawing";

export const DemoPage = () => {
  return (
    <GenericDemoPage
      initiallySelectedPuzzle={{}}
      initialDrawingOptions={{}}
      Drawing={Drawing}
    />
  );
};
