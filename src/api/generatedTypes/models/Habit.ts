/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Color } from "./Color";
import type { HabitHistoryItem } from "./HabitHistoryItem";
import type { Icon } from "./Icon";
export type Habit = {
  id: number;
  name: string;
  description: string;
  completion_frequency: number;
  completion_count: number;
  icon: Icon;
  color: Color;
  history: Array<HabitHistoryItem>;
};
