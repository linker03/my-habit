CREATE TABLE "new_HabitCompletion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habitId" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "targetCount" INTEGER NOT NULL,
    "completedCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "HabitCompletion_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- ключевая строка: конвертируем DateTime -> "YYYY-MM-DD"
INSERT INTO "new_HabitCompletion" ("id", "habitId", "date", "targetCount", "completedCount")
SELECT "id", "habitId", strftime('%Y-%m-%d', "date"), "targetCount", "completedCount"
FROM "HabitCompletion";

DROP TABLE "HabitCompletion";
ALTER TABLE "new_HabitCompletion" RENAME TO "HabitCompletion";

CREATE UNIQUE INDEX "HabitCompletion_habitId_date_key" ON "HabitCompletion"("habitId", "date");

PRAGMA foreign_keys=ON;