import { Habit } from '@/prisma/generated/prisma/client';
import { prismaClient as prisma } from './prismaClient';

export const habitRepository = {
  findAll(): Promise<Habit[]> {
    return prisma.habit.findMany({
      orderBy: { createdAt: 'asc' },
    });
  },

  findById(id: number): Promise<Habit | null> {
    return prisma.habit.findUnique({
      where: { id },
    });
  },

  create(data: Omit<Habit, 'id' | 'createdAt'>): Promise<Habit> {
    return prisma.habit.create({ data });
  },

  update(id: number, data: Partial<Habit>): Promise<Habit> {
    return prisma.habit.update({
      where: { id },
      data,
    });
  },

  delete(id: number): Promise<Habit> {
    return prisma.habit.delete({
      where: { id },
    });
  },
};
