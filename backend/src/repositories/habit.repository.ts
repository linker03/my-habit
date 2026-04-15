import {
  Habit,
  HabitLog,
  PrismaClient,
} from '@/prisma/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

export const prisma = new PrismaClient({ adapter });

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
    completionCount: number,
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
