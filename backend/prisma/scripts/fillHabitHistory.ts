import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({
  url: connectionString,
});

export const prismaClient = new PrismaClient({ adapter });

const startDate = new Date('2026-07-13T18:00:00.000Z');
const days = 365;

const data = [];

for (let i = 0; i < days; i++) {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() - i);

  data.push({
    habitId: 1,
    date: date.toISOString(), // строка
    targetCount: 1,
    completedCount: Math.round(Math.random()), // 0 или 1
  });
}

await prismaClient.habitCompletion.createMany({
  data,
});
