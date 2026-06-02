// import { Habit } from './generatedTypes';
// import { apiInstance } from './service';

// export const getAllHabits = () => apiInstance.get('v1/habits').json();
// export const createHabit = (habit: Habit) =>
//   apiInstance.post('v1/habits', { json: habit }).json();

// export const updateHabit = (id: number, habit: Partial<Habit>) =>
//   apiInstance.put(`v1/habits/${id}`, { json: habit }).json();

// export const deleteHabit = (id: number) => apiInstance.delete(`v1/habits/${id}`);

import {
  Habit,
  HabitWithCompletions,
  CreateHabitDTO,
  UpdateHabitDTO,
  SetHabitValueDTO,
  SetHabitForDateDTO,
  HabitCompletion,
} from '../types/types';

import { apiInstance } from './service';

// =====================
// HABITS (CRUD)
// =====================

export const getAllHabits = (): Promise<Habit[]> =>
  apiInstance.get('v1/habits').json();

export const getHabitById = (id: number): Promise<Habit> =>
  apiInstance.get(`v1/habits/${id}`).json();

export const createHabit = (habit: CreateHabitDTO): Promise<Habit> =>
  apiInstance.post('v1/habits', { json: habit }).json();

export const updateHabit = (
  id: number,
  habit: UpdateHabitDTO,
): Promise<Habit> => apiInstance.put(`v1/habits/${id}`, { json: habit }).json();

export const deleteHabit = (id: number): Promise<void> =>
  apiInstance.delete(`v1/habits/${id}`).json();

// =====================
// CALENDAR / MAIN SCREEN
// =====================

/**
 * Главный экран (все привычки + прогресс за период)
 */
export const getHabitsWithCompletions = (
  from: string,
  to: string,
): Promise<HabitWithCompletions[]> =>
  apiInstance
    .get('v1/habits/with-completions', {
      searchParams: { from, to },
    })
    .json();

// =====================
// STATE ACTIONS (UI)
// =====================

/**
 * Кнопка "сделал сегодня"
 */
export const setToday = (
  id: number,
  data: SetHabitValueDTO,
): Promise<HabitCompletion> =>
  apiInstance.post(`v1/habits/${id}/today`, { json: data }).json();

/**
 * Изменить значение в календаре
 */
export const setHabitForDate = (
  id: number,
  data: SetHabitForDateDTO,
): Promise<HabitCompletion> =>
  apiInstance.post(`v1/habits/${id}/date`, { json: data }).json();

// =====================
// OPTIONAL (если добавишь статистику позже)
// =====================

export const getHabitCompletions = (
  id: number,
  from: string,
  to: string,
): Promise<HabitCompletion[]> =>
  apiInstance
    .get(`v1/habits/${id}/completions`, {
      searchParams: { from, to },
    })
    .json();
