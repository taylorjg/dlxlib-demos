import { Button, CircularProgress } from "@mui/material";
import { CurrentState } from "types";

import { StyledActionControls } from "./action-controls.styles";

export type ActionControlsProps = {
  currentState: CurrentState;
  onSolve: () => void;
  onCancel: () => void;
  onReset: () => void;
};

export const ActionControls: React.FunctionComponent<ActionControlsProps> = ({
  currentState,
  onSolve,
  onCancel,
  onReset,
}: ActionControlsProps) => {
  return (
    <StyledActionControls>
      <Button onClick={onSolve} disabled={currentState !== CurrentState.Clean}>
        Solve
      </Button>
      <Button
        onClick={onCancel}
        disabled={currentState !== CurrentState.Solving}
      >
        Cancel
      </Button>
      <Button onClick={onReset} disabled={currentState !== CurrentState.Dirty}>
        Reset
      </Button>
      {currentState === CurrentState.Solving && (
        <CircularProgress size="1.5rem" thickness={5} />
      )}
    </StyledActionControls>
  );
};
