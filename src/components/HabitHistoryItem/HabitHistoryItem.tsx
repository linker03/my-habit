import { HabitHistory } from '../../types/HabitHistory';
import styles from './HabitHistoryItem.module.css';

interface HabitHistoryItemProps {
  habitHistoryElement: HabitHistory;
}

export const HabitHistoryItem = ({
  habitHistoryElement,
}: HabitHistoryItemProps) => {
  return (
    <div
      className={styles.root}
      style={{ opacity: habitHistoryElement.isDone ? 1 : 0.5 }}
    />
  );
};
