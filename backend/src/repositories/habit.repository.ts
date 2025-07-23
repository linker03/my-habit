import { Habit, HabitLog, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const habitRepository = {
  async findAll(): Promise<Habit[]> {
    return prisma.habit.findMany({
      include: {
        history: true,
      },
    });
  },

  async findById(id: number): Promise<Habit | null> {
    return prisma.habit.findUnique({
      where: { id },
      include: { history: true },
    });
  },

  async create(data: Omit<Habit, 'id'>): Promise<Habit> {
    return prisma.habit.create({ data });
  },

  async update(id: number, data: Partial<Habit>): Promise<Habit> {
    return prisma.habit.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<Habit> {
    return prisma.habit.delete({
      where: { id },
    });
  },

  async addLog(
    habitId: number,
    completionDate: Date,
    completionCount: number
  ): Promise<HabitLog> {
    return prisma.habitLog.create({
      data: {
        habitId,
        completionDate,
        completionCount,
      },
    });
  },
};
