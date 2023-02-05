import { Button } from "@mui/material"
import { CurrentState } from "types"

import { StyledActionControls } from "./action-controls.styles"

export type ActionControlsProps = {
  currentState: CurrentState,
  onSolve: () => void,
  onReset: () => void
}

export const ActionControls: React.FC<ActionControlsProps> = ({
  currentState,
  onSolve,
  onReset
}) => {
  return (
    <StyledActionControls>
      <Button onClick={onSolve} disabled={currentState !== CurrentState.Clean}>Solve</Button>
      <Button onClick={onReset} disabled={currentState !== CurrentState.Dirty} >Reset</Button>
    </StyledActionControls>
  )
}
