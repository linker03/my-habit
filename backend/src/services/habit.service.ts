import { habitRepository } from '../repositories/habit.repository';
import { BadRequestError, NotFoundError } from '@/errors';
import { toDateString } from '@/helpers/toDateString';
import { completionRepository } from '@/repositories/completion.repository';
import { validatePeriod } from '@/helpers/validatePeriod';
import { HabitCompletion, Habit } from '@/prisma/generated/prisma/client';

export type HabitWithDays = Habit & {
  days: HabitCompletion[];
};

export const habitService = {
  async getAllHabits(): Promise<Habit[]> {
    return habitRepository.findAll();
  },

  async getHabitById(id: number): Promise<Habit> {
    const habit = await habitRepository.findById(id);
    if (!habit) throw new NotFoundError('Habit not found');
    return habit;
  },

  async createHabit(data: Omit<Habit, 'id' | 'createdAt'>): Promise<Habit> {
    return habitRepository.create(data);
  },

  async updateHabit(id: number, data: Partial<Habit>): Promise<Habit> {
    await habitService.getHabitById(id);
    return habitRepository.update(id, data);
  },

  async deleteHabit(id: number): Promise<void> {
    await habitService.getHabitById(id);

    await completionRepository.deleteByHabit(id);
    await habitRepository.delete(id);
  },

  async getHabitsWithCompletions(
    from: Date,
    to: Date,
  ): Promise<HabitWithDays[]> {
    validatePeriod(from, to);

    const habits = await habitRepository.findAll();

    if (habits.length === 0) return [];

    const habitIds = habits.map((h) => h.id);

    const completions = await completionRepository.findByHabitsAndPeriod(
      habitIds,
      toDateString(from),
      toDateString(to),
    );

    // группируем completions по привычке
    const completionsMap = new Map<number, HabitCompletion[]>();

    for (const c of completions) {
      const arr = completionsMap.get(c.habitId) ?? [];
      arr.push(c);
      completionsMap.set(c.habitId, arr);
    }

    // формируем DTO для фронта
    return habits.map((habit) => ({
      ...habit,
      days: completionsMap.get(habit.id) ?? [],
    }));
  },

  async getHabitCompletions(habitId: number, from: Date, to: Date) {
    validatePeriod(from, to);

    await habitService.getHabitById(habitId);

    return completionRepository.findByHabitAndPeriod(
      habitId,
      toDateString(from),
      toDateString(to),
    );
  },

  async setToday(habitId: number, value: number) {
    if (value < 0) throw new BadRequestError('Value cannot be negative');

    const habit = await habitRepository.findById(habitId);

    if (!habit) throw new NotFoundError('Habit not found');

    const today = toDateString(new Date());

    return completionRepository.upsertCompletion(
      habitId,
      today,
      habit.frequency,
      value,
    );
  },

  async setCompletionForDate(habitId: number, date: Date, value: number) {
    if (value < 0) throw new BadRequestError('Value cannot be negative');

    const habit = await habitRepository.findById(habitId);

    if (!habit) throw new NotFoundError('Habit not found');

    const normalizedDate = toDateString(date);

    return completionRepository.upsertCompletion(
      habitId,
      normalizedDate,
      habit.frequency,
      value,
    );
  },
};
