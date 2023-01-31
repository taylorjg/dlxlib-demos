import { useRef } from "react"

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
    onSolutionFound: (solutionInternalRows: TInternalRow[]) => void
  ) {
    const worker = getWorker()
    worker.postMessage({ type: "solve", shortName, puzzle })
    worker.onmessage = (ev: MessageEvent<any>) => {
      console.log("[useWorker#solve]", "ev.data:", JSON.stringify(ev.data, null, 2))
      if (ev.data.type === "solutionFound") {
        const solutionInternalRows = ev.data.solutionInternalRows as TInternalRow[]
        console.log("[useWorker#solve]", "solutionInternalRows:", solutionInternalRows)
        onSolutionFound(solutionInternalRows)
      }
    }
  }

  return { solve }
}
