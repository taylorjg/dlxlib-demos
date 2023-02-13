import { useRef } from "react"
import { Mode } from "types"

export const useWorker = () => {

  const workerRef = useRef<Worker>()

  const getWorker = () => {
    if (!workerRef.current) {
      // https://webpack.js.org/guides/web-workers/
      const worker = new Worker(new URL('./worker/worker.ts', import.meta.url))
      workerRef.current = worker
    }
    return workerRef.current
  }

  function solve<TPuzzle, TInternalRow>(
    shortName: string,
    puzzle: TPuzzle,
    mode: Mode,
    onSearchStep: (solutionInternalRows: TInternalRow[]) => void,
    onSolutionFound: (solutionInternalRows: TInternalRow[]) => void,
    onFinished: (numSolutionsFound: number) => void,
    onError: (message: string) => void,
  ) {
    const worker = getWorker()
    worker.postMessage({ type: "solve", shortName, puzzle, mode })
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
      }

      if (ev.data.type === "error") {
        const message = ev.data.message as string
        onError(message)
      }
    }
  }

  return { solve }
}
