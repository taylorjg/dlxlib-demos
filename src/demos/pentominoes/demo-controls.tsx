import { FormLabel, FormControlLabel, Switch, FormGroup } from "@mui/material";
import { DemoControlsProps, EmptyPuzzle } from "types";
import { StyledControls } from "./demo-controls.styles";

export type DrawingOptions = {
  showLabels: boolean;
};

type LocalDemoControlsProps = DemoControlsProps<EmptyPuzzle, DrawingOptions>;

export const DemoControls: React.FunctionComponent<LocalDemoControlsProps> = ({
  drawingOptions,
  onDrawingOptionsChanged,
}: LocalDemoControlsProps) => {
  const handleShowCluesChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const showLabels = event.target.checked;
    const newDrawingOptions = { ...drawingOptions, showLabels };
    onDrawingOptionsChanged(newDrawingOptions);
  };

  return (
    <StyledControls>
      <FormGroup row>
        <FormLabel id="show-labels">Show Labels</FormLabel>
        <FormControlLabel
          control={
            <Switch
              sx={{ ml: "1rem" }}
              aria-labelledby="show-labels"
              size="small"
              checked={drawingOptions.showLabels}
              onChange={handleShowCluesChanged}
            />
          }
          label={drawingOptions.showLabels ? "On" : "Off"}
          labelPlacement="end"
        />
      </FormGroup>
    </StyledControls>
  );
};
