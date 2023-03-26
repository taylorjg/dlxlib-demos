import { FormLabel, FormControlLabel, Switch, FormGroup } from "@mui/material";
import { DemoControlsProps } from "types";
import { Puzzle } from "./puzzle";
import { StyledControls } from "./demo-controls.styles";

export type DrawingOptions = {
  showClueNumbers: boolean;
};

type LocalDemoControlsProps = DemoControlsProps<Puzzle, DrawingOptions>;

export const DemoControls: React.FunctionComponent<LocalDemoControlsProps> = ({
  drawingOptions,
  onDrawingOptionsChanged,
}: LocalDemoControlsProps) => {
  const handleShowCluesChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const showClueNumbers = event.target.checked;
    const newDrawingOptions = { ...drawingOptions, showClueNumbers };
    onDrawingOptionsChanged(newDrawingOptions);
  };

  return (
    <StyledControls>
      <FormGroup row>
        <FormLabel id="show-clues-numbers">Show Clue Numbers</FormLabel>
        <FormControlLabel
          control={
            <Switch
              sx={{ ml: "1rem" }}
              aria-labelledby="show-clues-numbers"
              size="small"
              checked={drawingOptions.showClueNumbers}
              onChange={handleShowCluesChanged}
            />
          }
          label={drawingOptions.showClueNumbers ? "On" : "Off"}
          labelPlacement="end"
        />
      </FormGroup>
    </StyledControls>
  );
};
