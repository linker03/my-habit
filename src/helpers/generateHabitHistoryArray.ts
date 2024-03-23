import { HabitHistory } from '../types/HabitHistory';

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateRandomBool(): boolean {
  return Math.random() < 0.5;
}

function generateRandomDate(start: Date): string {
  const randomOffset = Math.floor(Math.random() * 10); // случайное число от 0 до 9
  const date = new Date(start);
  date.setDate(start.getDate() - randomOffset);
  return date.toISOString().slice(0, 10);
}

export function generateHabitHistoryArray(length: number): HabitHistory[] {
  const habitHistoryArray: HabitHistory[] = [];

  const currentDate = new Date(); // текущая дата
  for (let i = 0; i < length; i++) {
    const habit: HabitHistory = {
      id: generateUUID(),
      dateIso: generateRandomDate(currentDate),
      isDone: generateRandomBool(),
    };

    habitHistoryArray.push(habit);
    currentDate.setDate(currentDate.getDate() - 1); // уменьшаем текущую дату на 1 день
  }

  return habitHistoryArray;
}
