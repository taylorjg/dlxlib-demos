import { Button } from "@mui/material"

import { StyledButtons } from "./buttons.styles"

export type ButtonsProps = {
  onSolve: () => void
}

export const Buttons: React.FC<ButtonsProps> = ({ onSolve }) => {
  return (
    <StyledButtons>
      <Button onClick={onSolve}>Solve</Button>
    </StyledButtons>
  )
}
