import { Habit } from './generatedTypes';
import { apiInstance } from './service';

export const getAllHabits = () => apiInstance.get('v1/habits').json();
export const createHabit = (habit: Habit) =>
  apiInstance.post('v1/habits', { json: habit }).json();

export const updateHabit = (id: number, habit: Partial<Habit>) =>
  apiInstance.put(`v1/habits/${id}`, { json: habit }).json();

export const deleteHabit = (id: number) => apiInstance.delete(`v1/habits/${id}`);
