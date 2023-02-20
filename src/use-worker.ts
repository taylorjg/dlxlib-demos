import { useRef } from "react"
import { Mode } from "types"
import { stop } from "worker/stop-token"
import { makeWorker } from "use-worker-utils"

export const useWorker = () => {

  const workerRef = useRef<Worker>()
  const stopTokenRef = useRef<string>()

  const getWorker = () => {
    if (!workerRef.current) {
      workerRef.current = makeWorker()
    }
    return workerRef.current
  }

  function solve<TPuzzle, TInternalRow>(
    stopToken: string,
    shortName: string,
    puzzle: TPuzzle,
    mode: Mode,
    onSearchStep: (solutionInternalRows: TInternalRow[]) => void,
    onSolutionFound: (solutionInternalRows: TInternalRow[]) => void,
    onFinished: (numSolutionsFound: number) => void,
    onError: (message: string) => void,
    onCancelled: () => void
  ) {
    stopTokenRef.current = stopToken
    const worker = getWorker()
    worker.postMessage({ type: "solve", stopToken, shortName, puzzle, mode })
    worker.onmessage = (ev: MessageEvent<any>) => {
      console.log("[useWorker#solve]", "ev.data.type:", ev.data.type)

      if (ev.data.type === "searchStep") {
        const solutionInternalRows = ev.data.solutionInternalRows as TInternalRow[]
        onSearchStep(solutionInternalRows)
      }

      if (ev.data.type === "solutionFound") {
        const solutionInternalRows = ev.data.solutionInternalRows as TInternalRow[]
        onSolutionFound(solutionInternalRows)
      }

      if (ev.data.type === "finished") {
        const numSolutionsFound = ev.data.numSolutionsFound as number
        onFinished(numSolutionsFound)
        _cleanup()
      }

      if (ev.data.type === "error") {
        const message = ev.data.message as string
        console.log("[useWorker#solve]", "error message:", message)
        onError(message)
        _cleanup()
      }

      if (ev.data.type === "cancelled") {
        onCancelled()
        _cleanup()
      }
    }
  }

  const cancel = () => {
    if (stopTokenRef.current) {
      stop(stopTokenRef.current)
    }
    _cleanup()
  }

  const close = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: "close" })
      workerRef.current = undefined
    }
  }

  const _cleanup = () => {
    if (stopTokenRef.current) {
      stopTokenRef.current = undefined
    }
  }

  return { solve, cancel, close }
}
