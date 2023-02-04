import { useEffect, useRef, useState } from "react"
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

// enum Mode { FirstSolution, SearchSteps }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BaseMessage<TInternalRow> {
}

class SearchStepMessage<TInternalRow> extends BaseMessage<TInternalRow> {
  public constructor(public solutionInternalRows: TInternalRow[]) {
    super()
  }
}

class SolutionFoundMessage<TInternalRow> extends BaseMessage<TInternalRow> {
  public constructor(public solutionInternalRows: TInternalRow[]) {
    super()
  }
}

class FinishedMessage<TInternalRow> extends BaseMessage<TInternalRow> {
  public constructor(public numSolutionsFound: number) {
    super()
  }
}

class ErrorMessage<TInternalRow> extends BaseMessage<TInternalRow> {
  public constructor(public message: string) {
    super()
  }
}

export type DemoPageProps<TPuzzle, TInternalRow> = {
  shortName?: string
  puzzle: TPuzzle,
  Drawing: React.FC<DrawingProps<TPuzzle, TInternalRow>>,
}

export function DemoPage<TPuzzle, TInternalRow>(props: DemoPageProps<TPuzzle, TInternalRow>) {
  const {
    shortName: shortNameProp,
    puzzle,
    Drawing
  } = props
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const shortName = shortNameProp ?? shortNameParam
  const availableDemo = lookupAvailableDemoByShortName(shortName)
  const [solutionInternalRows, setSolutionInternalRows] = useState<TInternalRow[]>([])
  const [currentState, setCurrentState] = useState<CurrentState>(CurrentState.Clean)
  // const [mode, setMode] = useState<Mode>(Mode.FirstSolution)
  const worker = useWorker()
  const messagesRef = useRef<BaseMessage<TInternalRow>[]>([])
  const timerRef = useRef<NodeJS.Timer>()

  useEffect(() => {
    return stopTimer
  }, [])

  const onTimer = () => {
    const message = messagesRef.current.shift()

    if (message instanceof SearchStepMessage) {
      const typedMessage = message as SearchStepMessage<TInternalRow>
      setSolutionInternalRows(typedMessage.solutionInternalRows)
      return
    }

    if (message instanceof SolutionFoundMessage) {
      const typedMessage = message as SolutionFoundMessage<TInternalRow>
      setSolutionInternalRows(typedMessage.solutionInternalRows)
      return
    }

    if (message instanceof FinishedMessage) {
      stopTimer()
      setCurrentState(CurrentState.Dirty)
      return
    }

    if (message instanceof ErrorMessage) {
      // TODO: show an error toast
      stopTimer()
      setCurrentState(CurrentState.Dirty)
      return
    }
  }

  const startTimer = () => {
    messagesRef.current = []
    timerRef.current = setInterval(onTimer, 100)
  }

  const stopTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = undefined
    messagesRef.current = []
  }

  // const pauseTimer = () => {
  // }

  // const resumeTimer = () => {
  // }

  const onSearchStep = (solutionInternalRows: TInternalRow[]): void => {
    messagesRef.current.push(new SearchStepMessage(solutionInternalRows))
  }

  const onSolutionFound = (solutionInternalRows: TInternalRow[]): void => {
    messagesRef.current.push(new SolutionFoundMessage(solutionInternalRows))
  }

  const onFinished = (numSolutionsFound: number): void => {
    messagesRef.current.push(new FinishedMessage(numSolutionsFound))
  }

  const onError = (message: string): void => {
    messagesRef.current.push(new ErrorMessage(message))
  }

  const onSolve = () => {
    startTimer()
    setCurrentState(CurrentState.Solving)
    worker.solve(shortName, puzzle, onSearchStep, onSolutionFound, onFinished, onError)
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
