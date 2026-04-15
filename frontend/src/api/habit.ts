import { Habit } from './generatedTypes';
import { apiInstance } from './service';

export const getAllHabits = () => apiInstance.get('v1/habits').json();
export const createHabit = (habit: Habit) =>
  apiInstance.post('v1/habits', { json: habit }).json();

//Редактировать привычку
//Удалить привычку
//Отметить выполнение привычки
//
