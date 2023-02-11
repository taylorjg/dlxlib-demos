import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { DemoControlsProps } from "types"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"
import { StyledControls } from "./demo-controls.styles"

export const DemoControls: React.FC<DemoControlsProps<Puzzle>> = ({
  selectedPuzzle,
  onSelectedPuzzleChanged,
}) => {

  const handleSelectedPuzzleChanged = (event: SelectChangeEvent<number>) => {
    const index = Number(event.target.value)
    onSelectedPuzzleChanged(puzzles[index])
  }

  const selectedIndex = puzzles.findIndex(puzzle => puzzle === selectedPuzzle)
  const selectPuzzleLabel = "Choose which piece to omit"

  return (
    <StyledControls>
      <FormControl size="small">
        <InputLabel id="select-puzzle">{selectPuzzleLabel}</InputLabel>
        <Select
          sx={{ minWidth: "12rem" }}
          id="select-puzzle"
          value={selectedIndex}
          label={selectPuzzleLabel}
          onChange={handleSelectedPuzzleChanged}
        >
          {puzzles.map((puzzle, index) =>
            <MenuItem key={index} value={index}>Omit {puzzle.pieceToOmit.label}</MenuItem>
          )}
        </Select>
      </FormControl>
    </StyledControls>
  )
}
