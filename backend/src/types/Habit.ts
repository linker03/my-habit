// import { HabitLog } from "./HabitLog";

import { HabitLog } from '@prisma/client';

export interface Habit {
  id: number;
  name: string;
  description?: string;
  completionFrequency: number;
  icon: string;
  color: string;
  history: HabitLog;
}
