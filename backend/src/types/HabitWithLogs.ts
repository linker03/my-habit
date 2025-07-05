import { Habit } from './Habit';
import { HabitLog } from './HabitLog';

export interface HabitWithLogs extends Habit {
  logs: HabitLog[];
}
