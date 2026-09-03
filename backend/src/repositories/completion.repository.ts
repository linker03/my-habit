import { prismaClient as prisma } from './prismaClient';

export const completionRepository = {
  // получить completions привычек за период
  findByHabitsAndPeriod(habitIds: number[], from: string, to: string) {
    return prisma.habitCompletion.findMany({
      where: {
        habitId: { in: habitIds },
        date: {
          gte: from,
          lte: to,
        },
      },
    });
  },

  // получить completions одной привычки
  findByHabitAndPeriod(habitId: number, from: string, to: string) {
    return prisma.habitCompletion.findMany({
      where: {
        habitId,
        date: {
          gte: from,
          lte: to,
        },
      },
      orderBy: { date: 'asc' },
    });
  },

  // 🔥 главный метод — UPSERT completion
  upsertCompletion(
    habitId: number,
    date: string,
    targetCount: number,
    completedCount: number,
  ) {
    return prisma.habitCompletion.upsert({
      where: {
        habitId_date: { habitId, date },
      },
      create: {
        habitId,
        date,
        targetCount,
        completedCount,
      },
      update: {
        completedCount,
      },
    });
  },

  deleteByHabit(habitId: number) {
    return prisma.habitCompletion.deleteMany({
      where: { habitId },
    });
  },
};
