import { HabitHistoryItem as HabitHistoryItemType } from '../../api/generatedTypes';
import styles from './HabitHistoryItem.module.css';

interface HabitHistoryItemProps {
  habitHistoryElement: HabitHistoryItemType;
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
            habitHistoryElement.completion_count,
            habitHistoryElement.completion_frequency,
          ) + 0.1,
      }}
    />
  );
};
const calculateOpacity = (done: number, total: number) => done / total;
