import styles from './HabitElement.module.css';
import { HabitHistoryItem } from 'components/HabitHistoryItem';
import { Button } from 'components/ui-kit/Button';
import type { HabitCompletion, HabitWithCompletions } from '../../types/types';
import { Icon } from 'components/ui-kit/Icon';
import { setToday } from '../../api/habit';
// import {
//   generateHabitHistoryByQuantity,
//   getDateAfterDays,
// } from '../../helpers';

interface HabitProps {
  habit: HabitWithCompletions;
  elementsCount: number;
  openHabitDetailsModal(): void;
}

export const HabitElement = ({
  habit,
  elementsCount,
  openHabitDetailsModal,
}: HabitProps) => {
  const onComplete = () => {
    setToday(habit.id, { value: 1 });
  };

  const elementsToDisplay = buildHabitCompletionRange(
    habit.days,
    elementsCount,
    { habitId: habit.id },
  );

  return (
    <div className={styles.root}>
      <div className={styles.topSide}>
        <Button onClick={openHabitDetailsModal}>
          <Icon name={habit.icon} />
        </Button>
        <h4 className={styles.heading}>{habit.name}</h4>
        <Button
          className={styles.doneButton}
          style={{ backgroundColor: habit.color }}
          onClick={onComplete}
        >
          <Icon name="plus" />
        </Button>
      </div>
      <div className={styles.bottomSide}>
        {elementsToDisplay.map((habitHistoryElement) => (
          <HabitHistoryItem
            key={habitHistoryElement.id}
            habitHistoryElement={habitHistoryElement}
            color={habit.color}
          />
        ))}
      </div>
    </div>
  );
};

// приводим дату к локальной полуночи (00:00:00.000) без ухода в UTC
function toLocalMidnight(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// формируем ISO-подобную строку БЕЗ конвертации в UTC (без суффикса Z),
// чтобы сохранить именно локальное "00:00:00" как записанное значение
function toLocalIsoString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00:00.000`;
}

function buildHabitCompletionRange(
  completions: HabitCompletion[],
  targetLength: number,
  options: { habitId: number; defaultTargetCount?: number; now?: Date },
): HabitCompletion[] {
  const { habitId, defaultTargetCount = 1, now = new Date() } = options;

  const today = toLocalMidnight(now);
  const dayOfWeek = today.getDay(); // 0=Sunday..6=Saturday, локальный день недели
  const daysUntilSunday = (7 - dayOfWeek) % 7;

  const end = new Date(today);
  end.setDate(end.getDate() + daysUntilSunday);

  const start = new Date(end);
  start.setDate(start.getDate() - (targetLength - 1));

  // индексируем исходные данные по локальной полуночи через timestamp
  const byDate = new Map<number, HabitCompletion>();
  for (const item of completions) {
    const ts = toLocalMidnight(new Date(item.date)).getTime();
    byDate.set(ts, item);
  }

  const result: HabitCompletion[] = [];
  let syntheticId = -1;

  const cursor = new Date(start);
  for (let i = 0; i < targetLength; i++) {
    const ts = cursor.getTime();
    const existing = byDate.get(ts);

    result.push(
      existing ?? {
        id: syntheticId--,
        habitId,
        date: toLocalIsoString(cursor),
        targetCount: defaultTargetCount,
        completedCount: 0,
      },
    );

    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}
