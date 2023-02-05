import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { DemoSpecificControlsProps } from "types"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"
import { StyledControls } from "./demo-sepcific-controls.styles"

export const DemoSpecificControls: React.FC<DemoSpecificControlsProps<Puzzle>> = ({
  selectedPuzzle,
  onSelectedPuzzleChanged
}) => {

  const onChange = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value)
    onSelectedPuzzleChanged(puzzles[index])
  }

  const selectedIndex = puzzles.findIndex(puzzle => puzzle === selectedPuzzle)
  const label = "Select a puzzle"

  return (
    <StyledControls>
      <FormControl size="small">
        <InputLabel id="select-puzzle">{label}</InputLabel>
        <Select
          id="select-puzzle"
          value={selectedIndex}
          label={label}
          onChange={onChange}
        >
          {puzzles.map((puzzle, index) =>
            <MenuItem key={index} value={index}>{puzzle.name}</MenuItem>
          )}
        </Select>
      </FormControl>
    </StyledControls>
  )
}
