import { PrismaClient } from '@/prisma/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import 'dotenv/config';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({
  url: connectionString,
});

export const prismaClient = new PrismaClient({ adapter });
