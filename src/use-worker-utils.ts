export const makeWorker = () => {
  // https://webpack.js.org/guides/web-workers/
  return new Worker(new URL("./worker/worker.ts", import.meta.url));
};
