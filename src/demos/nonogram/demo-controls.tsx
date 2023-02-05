import { FormControl, FormLabel, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch, FormGroup } from "@mui/material"
import { DemoControlsProps } from "types"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"
import { StyledControls } from "./demo-controls.styles"

export type DrawingOptions = {
  showClues: boolean
}

export const DemoControls: React.FC<DemoControlsProps<Puzzle, DrawingOptions>> = ({
  selectedPuzzle,
  drawingOptions,
  onSelectedPuzzleChanged,
  onDrawingOptionsChanged
}) => {

  const handleSelectedPuzzleChanged = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value)
    onSelectedPuzzleChanged(puzzles[index])
  }

  const handleShowCluesChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const showClues = event.target.checked
    const newDrawingOptions = { ...drawingOptions, showClues }
    onDrawingOptionsChanged(newDrawingOptions)
  }

  const selectedIndex = puzzles.findIndex(puzzle => puzzle === selectedPuzzle)
  const selectPuzzleLabel = "Select a puzzle"

  return (
    <StyledControls>
      <FormControl size="small">
        <InputLabel id="select-puzzle">{selectPuzzleLabel}</InputLabel>
        <Select
          id="select-puzzle"
          value={selectedIndex}
          label={selectPuzzleLabel}
          onChange={handleSelectedPuzzleChanged}
        >
          {puzzles.map((puzzle, index) =>
            <MenuItem key={index} value={index}>{puzzle.name}</MenuItem>
          )}
        </Select>
      </FormControl>

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
