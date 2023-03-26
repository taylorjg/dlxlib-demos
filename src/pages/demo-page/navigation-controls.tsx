import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import { CurrentState, Mode } from "types";

import { StyledNavigationControls } from "./navigation-controls.styles";

export type NavigationControlsProps = {
  currentState: CurrentState;
  selectedMode: Mode;
  onModeChanged: (mode: Mode) => void;
  animationSpeed: number;
  onAnimationSpeedChanged: (animationSpeed: number) => void;
};

export const NavigationControls: React.FunctionComponent<
  NavigationControlsProps
> = ({
  currentState,
  selectedMode,
  onModeChanged,
  animationSpeed,
  onAnimationSpeedChanged,
}: NavigationControlsProps) => {
  const handleSelectedModeChanged = (event: SelectChangeEvent<number>) => {
    const newMode = Number(event.target.value);
    onModeChanged(newMode);
  };

  const handleAnimationSpeedChange = (
    _event: Event,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) {
      onAnimationSpeedChanged(value);
    }
  };

  const selectModeLabel = "Select mode";

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
          <MenuItem key={Mode.FirstSolution} value={Mode.FirstSolution}>
            First Solution
          </MenuItem>
          <MenuItem key={Mode.SearchSteps} value={Mode.SearchSteps}>
            Search Steps
          </MenuItem>
        </Select>
      </FormControl>
      {selectedMode === Mode.SearchSteps && (
        <Slider
          sx={{ width: "10rem" }}
          size="small"
          aria-label="Small"
          valueLabelDisplay="auto"
          min={0}
          max={100}
          step={10}
          value={animationSpeed}
          onChange={handleAnimationSpeedChange}
        />
      )}
    </StyledNavigationControls>
  );
};
