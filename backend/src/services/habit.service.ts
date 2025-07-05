import { Habit, HabitLog } from '@prisma/client';
import { habitRepository } from '../repositories/habit.repository';
import { NotFoundError } from '@/errors';

export const habitService = {
  async getAllHabits(): Promise<Habit[]> {
    return habitRepository.findAll();
  },

  async getHabitById(id: number): Promise<Habit> {
    const habit = await habitRepository.findById(id);
    if (!habit) throw new NotFoundError('Habit not found');
    return habit;
  },

  async createHabit(data: Omit<Habit, 'id'>): Promise<Habit> {
    return habitRepository.create(data);
  },

  async updateHabit(id: number, data: Partial<Habit>): Promise<Habit> {
    await habitService.getHabitById(id);
    return habitRepository.update(id, data);
  },

  async deleteHabit(id: number): Promise<void> {
    await habitRepository.delete(id);
  },

  async addHabitLog(habitId: number, date: Date): Promise<HabitLog> {
    await habitService.getHabitById(habitId);
    return habitRepository.addLog(habitId, date, 1);
  },
};
