/*
  Warnings:

  - You are about to drop the column `completion_frequency` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `completion_count` on the `HabitLog` table. All the data in the column will be lost.
  - You are about to drop the column `completion_date` on the `HabitLog` table. All the data in the column will be lost.
  - Added the required column `completionFrequency` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completionCount` to the `HabitLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completionDate` to the `HabitLog` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "completionFrequency" INTEGER NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL
);
INSERT INTO "new_Habit" ("color", "description", "icon", "id", "name") SELECT "color", "description", "icon", "id", "name" FROM "Habit";
DROP TABLE "Habit";
ALTER TABLE "new_Habit" RENAME TO "Habit";
CREATE TABLE "new_HabitLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "completionDate" DATETIME NOT NULL,
    "completionCount" INTEGER NOT NULL,
    "habitId" INTEGER NOT NULL,
    CONSTRAINT "HabitLog_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HabitLog" ("habitId", "id") SELECT "habitId", "id" FROM "HabitLog";
DROP TABLE "HabitLog";
ALTER TABLE "new_HabitLog" RENAME TO "HabitLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
