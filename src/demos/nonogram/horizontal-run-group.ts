import { RunGroupType } from "./run-group-type";

export type HorizontalRunGroup = {
  runGroupType: RunGroupType;
  lengths: number[];
  row: number;
};
