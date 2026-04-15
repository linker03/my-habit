/*
  Warnings:

  - You are about to drop the `HabitLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `color` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `completionFrequency` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `frequency` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interval` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HabitLog";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HabitCompletion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habitId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "targetCount" INTEGER NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "HabitCompletion_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "frequency" INTEGER NOT NULL,
    "interval" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Habit" ("description", "id", "name") SELECT "description", "id", "name" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "HabitCompletion_habitId_date_key" ON "HabitCompletion"("habitId", "date");
