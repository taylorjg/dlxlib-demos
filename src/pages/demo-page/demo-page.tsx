import { useState } from "react"
import { useParams } from "react-router-dom"

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
import { CurrentState, DrawingProps } from "types"
import { useWorker } from "useWorker"

type DemoPageParams = {
  shortName: string
}

export type DemoPageProps<TPuzzle, TInternalRow> = {
  puzzle: TPuzzle,
  Drawing: React.FC<DrawingProps<TPuzzle, TInternalRow>>,
  shortName?: string
}

export function DemoPage<TPuzzle, TInternalRow>(props: DemoPageProps<TPuzzle, TInternalRow>) {
  const {
    puzzle,
    Drawing,
    shortName: shortNameProp
  } = props
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const shortName = shortNameProp ?? shortNameParam
  const availableDemo = lookupAvailableDemoByShortName(shortName)
  const [solutionInternalRows, setSolutionInternalRows] = useState<TInternalRow[]>([])
  const [currentState, setCurrentState] = useState<CurrentState>(CurrentState.Clean)
  const worker = useWorker()

  const onSolve = () => {
    setCurrentState(CurrentState.Solving)
    worker.solve(shortName, puzzle, (solutionInternalRows: TInternalRow[]) => {
      setSolutionInternalRows(solutionInternalRows)
      setCurrentState(CurrentState.Dirty)
    })
  }

  const onReset = () => {
    setSolutionInternalRows([])
    setCurrentState(CurrentState.Clean)
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
      <Buttons onSolve={onSolve} onReset={onReset} currentState={currentState} />
    </StyledPage>
  )
}
