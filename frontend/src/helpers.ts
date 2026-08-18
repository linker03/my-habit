import { HabitCompletion } from './types/types';

export function generateHabitHistoryByQuantity({
  quantity,
  targetCount = 3,
  startDate = new Date(),
  completionCount,
  habitId,
}: {
  quantity: number;
  targetCount: number;
  startDate: Date;
  completionCount: number;
  habitId: number;
}): HabitCompletion[] {
  const habitItems = [];

  for (let i = 0; i < quantity; i++) {
    const id = i + Date.now();

    const completedCount = completionCount ?? getRandomNumber(0, targetCount);

    const daysFromToday = daysToMiliseconds(i);
    const date = formatDate(new Date(startDate.valueOf() - daysFromToday));

    habitItems.push({
      id,
      date,
      completedCount,
      targetCount,
      habitId,
    });
  }

  return habitItems;
}

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getRandomNumber(start: number, end: number) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

function daysToMiliseconds(days: number) {
  return days * 1000 * 60 * 60 * 24;
}

export function getDateAfterDays(date: Date, days: number) {
  return new Date(date.valueOf() + daysToMiliseconds(days));
}
