import { useState } from "react"
import { useParams } from "react-router-dom"

import * as dlxlib from "dlxlib/dlx"
import { lookupAvailableDemoByShortName } from "available-demos"
import { HeaderNavBar } from "./header-nav-bar"
import { Buttons } from "./buttons"
import {
  StyledPage,
  StyledMainContent,
  StyledDrawingWrapper,
  StyledErrorPage,
  StyledError
} from "./demo-page.styles"
import { DrawingProps, IDemo } from "types"

type DemoPageParams = {
  shortName: string
}

export type DemoPageProps<TInternalRow> = {
  demo: IDemo<TInternalRow>,
  Drawing: React.FC<DrawingProps<TInternalRow>>,
  shortName?: string
}

export function DemoPage<TInternalRow>(props: DemoPageProps<TInternalRow>) {
  const {
    demo,
    Drawing,
    shortName: shortNameProp
  } = props
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const shortName = shortNameProp ?? shortNameParam
  const availableDemo = lookupAvailableDemoByShortName(shortName)
  const [solutionInternalRows, setSolutionInternalRows] = useState<TInternalRow[]>([])

  const onSolve = () => {
    const internalRows = demo.buildInternalRows()
    const matrix = internalRows.map(internalRow => demo.internalRowToMatrixRow(internalRow))
    const options: dlxlib.Options = {
      numSolutions: 1,
      numPrimaryColumns: demo.getNumPrimaryColumns()
    }
    const solutions = dlxlib.solve(matrix, options)
    if (solutions.length === 1) {
      setSolutionInternalRows(solutions[0].map(index => internalRows[index]))
    }
  }

  if (!availableDemo) {
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
      <HeaderNavBar availableDemo={availableDemo} />
      <StyledMainContent>
        <StyledDrawingWrapper>
          <Drawing solutionInternalRows={solutionInternalRows} />
        </StyledDrawingWrapper>
      </StyledMainContent>
      <Buttons onSolve={onSolve} />
    </StyledPage>
  )
}
