import { Button } from "@mui/material"
import { CurrentState } from "types"

import { StyledButtons } from "./buttons.styles"

export type ButtonsProps = {
  currentState: CurrentState,
  onSolve: () => void,
  onReset: () => void
}

export const Buttons: React.FC<ButtonsProps> = ({
  currentState,
  onSolve,
  onReset
}) => {
  return (
    <StyledButtons>
      <Button onClick={onSolve} disabled={currentState !== CurrentState.Clean}>Solve</Button>
      <Button onClick={onReset} disabled={currentState !== CurrentState.Dirty} >Reset</Button>
    </StyledButtons>
  )
}
