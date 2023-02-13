import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { CurrentState, Mode } from "types"

import { StyledNavigationControls } from "./navigation-controls.styles"

export type NavigationControlsProps = {
  currentState: CurrentState,
  selectedMode: Mode,
  onModeChanged: (mode: Mode) => void,
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentState,
  selectedMode,
  onModeChanged
}) => {

  const handleSelectedModeChanged = (event: SelectChangeEvent<number>) => {
    const newMode = Number(event.target.value)
    onModeChanged(newMode)
  }

  const selectModeLabel = "Select mode"

  return (
    <StyledNavigationControls>
      <FormControl size="small">
        <InputLabel id="select-mode">{selectModeLabel}</InputLabel>
        <Select
          id="select-puzzle"
          value={selectedMode}
          label={selectModeLabel}
          onChange={handleSelectedModeChanged}
          disabled={currentState === CurrentState.Solving}
        >
          <MenuItem key={Mode.FirstSolution} value={Mode.FirstSolution}>First Solution</MenuItem>
          <MenuItem key={Mode.SearchSteps} value={Mode.SearchSteps}>Search Steps</MenuItem>
        </Select>
      </FormControl>
    </StyledNavigationControls>
  )
}
