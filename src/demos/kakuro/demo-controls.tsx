import { FormLabel, FormControlLabel, Switch, FormGroup } from "@mui/material"
import { DemoControlsProps } from "types"
import { Puzzle } from "./puzzle"
import { StyledControls } from "./demo-controls.styles"

export type DrawingOptions = {
  showClues: boolean
}

export const DemoControls: React.FC<DemoControlsProps<Puzzle, DrawingOptions>> = ({
  drawingOptions,
  onDrawingOptionsChanged
}) => {

  const handleShowCluesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const showClues = event.target.checked
    const newDrawingOptions = { ...drawingOptions, showClues }
    onDrawingOptionsChanged(newDrawingOptions)
  }

  return (
    <StyledControls>
      <FormGroup row>
        <FormLabel id="show-clues">Show Clues</FormLabel>
        <FormControlLabel
          control={
            <Switch
              sx={{ ml: "1rem" }}
              aria-labelledby="show-clues"
              size="small"
              checked={drawingOptions.showClues}
              onChange={handleShowCluesChanged}
            />
          }
          label={drawingOptions.showClues ? "On" : "Off"}
          labelPlacement="end"
        />
      </FormGroup>
    </StyledControls>
  )
}
