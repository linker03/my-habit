export type ID = number;

/**
 * ===== Habit =====
 */

export type HabitInterval = 'DAY' | 'WEEK' | 'MONTH';

export type Habit = {
  id: ID;
  name: string;
  description: string | null;
  icon: string;
  color: string;
  frequency: number;
  createdAt: string; // ISO string для фронта
  interval: HabitInterval;
};

/**
 * ===== Habit Completion (состояние за день) =====
 */

export type HabitCompletion = {
  id: ID;
  habitId: ID;
  date: string; // YYYY-MM-DD (или ISO)
  targetCount: number;
  completedCount: number;
};

/**
 * ===== DTO для главного экрана =====
 * GET /habits/with-completions?from&to
 */

export type HabitWithCompletions = Habit & {
  days: HabitCompletion[];
};

/**
 * ===== API requests =====
 */

export type CreateHabitDTO = Omit<Habit, 'id' | 'createdAt'>;

export type UpdateHabitDTO = Partial<CreateHabitDTO>;

/**
 * setToday / setForDate
 */

export type SetHabitValueDTO = {
  value: number;
};

export type SetHabitForDateDTO = {
  date: string;
  value: number;
};

/**
 * ===== Query params =====
 */

export type DateRangeQuery = {
  from: string;
  to: string;
};

export type SetTodayBody = {
  value: number;
};

export type SetForDateBody = {
  date: string;
  value: number;
};
