import { Button } from "@mui/material"

import * as dlxlib from "dlxlib/dlx"
import { NQueensDemo } from "demos/n-queens/demo"
import { StyledButtons } from "./buttons.styles"

export const Buttons = () => {
  const onSolve = () => {
    const demo = new NQueensDemo()
    const internalRows = demo.buildInternalRows()
    const matrix = internalRows.map(demo.internalRowToMatrixRow)
    const options: dlxlib.Options = {
      numSolutions: 1,
      numPrimaryColumns: demo.getNumPrimaryColumns()
    }
    const solutions = dlxlib.solve(matrix, options)
    for (const solution of solutions) {
      const solutionInternalRows = solution.map(index => internalRows[index])
      console.log("solutionInternalRowssolution:", JSON.stringify(solutionInternalRows, null, 2))
    }
  }

  return (
    <StyledButtons>
      <Button onClick={onSolve}>Solve</Button>
    </StyledButtons>
  )
}
