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

export type DemoPageProps<TPuzzle, TInternalRow> = {
  puzzle: TPuzzle,
  demo: IDemo<TPuzzle, TInternalRow>,
  Drawing: React.FC<DrawingProps<TPuzzle, TInternalRow>>,
  shortName?: string
}

export function DemoPage<TPuzzle, TInternalRow>(props: DemoPageProps<TPuzzle, TInternalRow>) {
  const {
    puzzle,
    demo,
    Drawing,
    shortName: shortNameProp
  } = props
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const shortName = shortNameProp ?? shortNameParam
  const availableDemo = lookupAvailableDemoByShortName(shortName)
  const [solutionInternalRows, setSolutionInternalRows] = useState<TInternalRow[]>([])

  const onSolve = () => {
    const internalRows = demo.buildInternalRows(puzzle)
    const matrix = internalRows.map(internalRow => demo.internalRowToMatrixRow(internalRow))
    const options: dlxlib.Options = {
      numSolutions: 1,
      numPrimaryColumns: demo.getNumPrimaryColumns(puzzle)
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
          <Drawing puzzle={puzzle} solutionInternalRows={solutionInternalRows} />
        </StyledDrawingWrapper>
      </StyledMainContent>
      <Buttons onSolve={onSolve} />
    </StyledPage>
  )
}
