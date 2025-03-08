import { HabitHistoryItem as HabitHistoryItemType } from '../../api/generatedTypes';
import styles from './HabitHistoryItem.module.css';

interface HabitHistoryItemProps {
  habitHistoryElement: HabitHistoryItemType;
}

export const HabitHistoryItem = ({
  habitHistoryElement,
}: HabitHistoryItemProps) => {
  return (
    <div
      className={styles.root}
      style={{
        opacity:
          calculateOpacity(
            habitHistoryElement.completion_count,
            habitHistoryElement.completion_frequency
          ) + 0.1,
      }}
    />
  );
};
const calculateOpacity = (done: number, total: number) => done / total;
