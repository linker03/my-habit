import { HabitCompletion } from '../../types/types';
import styles from './HabitHistoryItem.module.css';

interface HabitHistoryItemProps {
  habitHistoryElement: HabitCompletion;
  color: string;
}

export const HabitHistoryItem = ({
  habitHistoryElement,
  color,
}: HabitHistoryItemProps) => {
  return (
    <div
      className={styles.root}
      style={{
        backgroundColor: color,
        opacity:
          calculateOpacity(
            habitHistoryElement.completedCount,
            habitHistoryElement.targetCount,
          ) + 0.1,
      }}
    />
  );
};

const calculateOpacity = (done: number, total: number) => done / total;
