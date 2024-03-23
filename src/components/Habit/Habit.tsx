import { habitHistoryData } from 'components/mockData/mockHabitHistory';
import styles from './Habit.module.css';
import { HabitHistoryItem } from 'components/HabitHistoryItem';
import { IconButton } from 'components/ui-kit/IconButton';

export const Habit = () => {
  return (
    <div className={styles.root}>
      <div className={styles.topSide}>
        <IconButton>
          <img src="icons/shopping-cart.svg" alt="" />
        </IconButton>
        <h4 className={styles.heading}>Habit</h4>
        <IconButton className={styles.doneButton}>
          <img src="icons/plus.svg" alt="" />
        </IconButton>
      </div>
      <div className={styles.bottomSide}>
        {habitHistoryData.map((habitHistoryElement) => (
          <HabitHistoryItem habitHistoryElement={habitHistoryElement} />
        ))}
      </div>
    </div>
  );
};
