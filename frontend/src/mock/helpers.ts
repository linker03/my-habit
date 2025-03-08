export function generateHabitHistoryByQuantity({
  quantity,
  frequency = 3,
  startDate = new Date(),
  completionCount,
}: {
  quantity: number;
  frequency: number;
  startDate: Date;
  completionCount: number;
}) {
  const completion_frequency = frequency;
  const habitItems = [];

  for (let i = 0; i < quantity; i++) {
    const id = i + Date.now();

    const completion_count =
      completionCount ?? getRandomNumber(0, completion_frequency);

    const daysFromToday = daysToMiliseconds(i);
    const date = formatDate(new Date(startDate.valueOf() - daysFromToday));

    habitItems.push({
      id,
      date,
      completion_count,
      completion_frequency,
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
