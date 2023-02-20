import { useEffect, useRef, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { lookupAvailableDemoByShortName } from "available-demos"
import { HeaderNavBar } from "./header-nav-bar"
import { ActionControls } from "./action-controls"
import { NavigationControls } from "./navigation-controls"
import {
  StyledPage,
  StyledMainContent,
  StyledDrawingWrapper,
  StyledErrorPage,
  StyledError
} from "./demo-page.styles"
import { CurrentState, DrawingProps, DemoControlsProps, Mode } from "types"
import { useWorker } from "use-worker"
import { last } from "utils"
import { createStopToken } from "worker/stop-token"

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

type DemoPageParams = {
  shortName: string
}

export type DemoPageProps<TPuzzle, TInternalRow, TDrawingOptions> = {
  initiallySelectedPuzzle: TPuzzle,
  initialDrawingOptions: TDrawingOptions,
  Drawing: React.FC<DrawingProps<TPuzzle, TInternalRow, TDrawingOptions>>,
  DemoControls?: React.FC<DemoControlsProps<TPuzzle, TDrawingOptions>>,
}

export function DemoPage<TPuzzle, TInternalRow, TDrawingOptions>(
  props: DemoPageProps<TPuzzle, TInternalRow, TDrawingOptions>
) {
  const {
    initiallySelectedPuzzle,
    initialDrawingOptions,
    Drawing,
    DemoControls
  } = props
  const { shortName: shortNameParam } = useParams<DemoPageParams>()
  const { pathname } = useLocation()
  const lastSegmentOfPathname = last(pathname.split("/"))
  const shortName = shortNameParam ?? lastSegmentOfPathname
  const availableDemo = lookupAvailableDemoByShortName(shortName)
  const [selectedPuzzle, setSelectedPuzzle] = useState(initiallySelectedPuzzle)
  const [drawingOptions, setDrawingOptions] = useState(initialDrawingOptions)
  const [solutionInternalRows, setSolutionInternalRows] = useState<TInternalRow[]>([])
  const [currentState, setCurrentState] = useState(CurrentState.Clean)
  const [mode, setMode] = useState(Mode.FirstSolution)
  const [animationSpeed, setAnimationSpeed] = useState(100)
  const workerRef = useRef(useWorker())
  const messagesRef = useRef<BaseMessage<TInternalRow>[]>([])
  const timerRef = useRef<NodeJS.Timer>()

  useEffect(() => {
    const worker = workerRef.current
    return () => {
      stopTimer()
      if (worker) {
        worker.cancel()
        worker.close()
      }
    }
  }, [])

  useEffect(() => {
    if (currentState === CurrentState.Solving) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(onTimer, animationSpeed)
    }
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [animationSpeed])

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
    timerRef.current = setInterval(onTimer, animationSpeed)
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

  const onCancelled = (): void => {
    stopTimer()
    setCurrentState(CurrentState.Dirty)
  }

  const onSolve = () => {
    startTimer()
    setCurrentState(CurrentState.Solving)
    const stopToken = createStopToken()
    workerRef.current.solve(
      stopToken,
      shortName,
      selectedPuzzle,
      mode,
      onSearchStep,
      onSolutionFound,
      onFinished,
      onError,
      onCancelled)
  }

  const onCancel = () => {
    workerRef.current.cancel()
    stopTimer()
    setCurrentState(CurrentState.Dirty)
  }

  const onReset = () => {
    setSolutionInternalRows([])
    setCurrentState(CurrentState.Clean)
  }

  const onSelectedPuzzleChanged = (newSelectedPuzzle: TPuzzle) => {
    onReset()
    setSelectedPuzzle(newSelectedPuzzle)
  }

  const onDrawingOptionsChanged = (newDrawingOptions: TDrawingOptions) => {
    setDrawingOptions(newDrawingOptions)
  }

  const onModeChanged = (newMode: Mode) => {
    setMode(newMode)
  }

  const onAnimationSpeedChanged = (newAnimationSpeed: number) => {
    setAnimationSpeed(newAnimationSpeed)
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
        <StyledDrawingWrapper hideBorder={availableDemo.hideBorder}>
          <Drawing
            puzzle={selectedPuzzle}
            solutionInternalRows={solutionInternalRows}
            drawingOptions={drawingOptions}
          />
        </StyledDrawingWrapper>
      </StyledMainContent>
      {DemoControls && (
        <DemoControls
          selectedPuzzle={selectedPuzzle}
          drawingOptions={drawingOptions}
          onSelectedPuzzleChanged={onSelectedPuzzleChanged}
          onDrawingOptionsChanged={onDrawingOptionsChanged}
        />
      )}
      <NavigationControls
        currentState={currentState}
        selectedMode={mode}
        onModeChanged={onModeChanged}
        animationSpeed={animationSpeed}
        onAnimationSpeedChanged={onAnimationSpeedChanged}
      />
      <ActionControls currentState={currentState} onSolve={onSolve} onCancel={onCancel} onReset={onReset} />
    </StyledPage>
  )
}
