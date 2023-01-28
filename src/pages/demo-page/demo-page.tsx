import { useState } from "react"
import { useParams } from "react-router-dom"

import * as dlxlib from "dlxlib/dlx"
import { NQueensDemo } from "demos/n-queens/demo"
import { lookupAvailableDemoByShortName } from "available-demos"
import { HeaderNavBar } from "./header-nav-bar"
import { PlaceholderDrawing } from "./placeholder-drawing"
import { Buttons } from "./buttons"
import {
  StyledPage,
  StyledMainContent,
  StyledDrawingWrapper,
  StyledErrorPage,
  StyledError
} from "./demo-page.styles"
import { NQueensInternalRow } from "demos/n-queens/internal-row"
import { DrawingProps } from "types"

type DemoPageParams = {
  shortName: string
}

export type DemoPageProps = {
  Drawing?: React.FC<DrawingProps>,
  shortName?: string
}

export const DemoPage: React.FC<DemoPageProps> = ({
  Drawing = PlaceholderDrawing,
  shortName: shortNameProp
}) => {
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const shortName = shortNameProp ?? shortNameParam
  const demo = lookupAvailableDemoByShortName(shortName)
  const [solutionInternalRows, setSolutionInternalRows] = useState<NQueensInternalRow[]>([])

  const onSolve = () => {
    const demo = new NQueensDemo()
    const internalRows = demo.buildInternalRows()
    const matrix = internalRows.map(demo.internalRowToMatrixRow)
    const options: dlxlib.Options = {
      numSolutions: 1,
      numPrimaryColumns: demo.getNumPrimaryColumns()
    }
    const solutions = dlxlib.solve(matrix, options)
    if (solutions.length === 1) {
      setSolutionInternalRows(solutions[0].map(index => internalRows[index]))
    }
  }

  if (!demo) {
    return (
      <StyledErrorPage>
        <StyledError>
          Oops! It looks like no demo exists with short name, "{shortName}".
        </StyledError>
      </StyledErrorPage>
    )
  }

  return (
    <StyledPage>
      <HeaderNavBar demo={demo} />
      <StyledMainContent>
        <StyledDrawingWrapper>
          <Drawing solutionInternalRows={solutionInternalRows} />
        </StyledDrawingWrapper>
      </StyledMainContent>
      <Buttons onSolve={onSolve} />
    </StyledPage>
  )
}
