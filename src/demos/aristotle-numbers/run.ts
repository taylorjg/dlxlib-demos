import { range } from "utils";
import { RunType } from "./run-type";

export type Run = {
  runType: RunType;
  cellIds: number[];
};

const sameCellIds = (cellIds1: number[], cellIds2: number[]): boolean => {
  if (cellIds1.length !== cellIds2.length) return false;
  for (const index of range(cellIds1.length)) {
    const cellId1 = cellIds1[index];
    const cellId2 = cellIds2[index];
    if (cellId1 !== cellId2) return false;
  }
  return true;
};

export const sameRun = (run1: Run, run2: Run): boolean => {
  return (
    run1.runType === run2.runType && sameCellIds(run1.cellIds, run2.cellIds)
  );
};
