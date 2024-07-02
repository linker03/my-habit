import habitHistoryData from 'mock/habitHistoryMock.json';
import styles from './Habit.module.css';
import { HabitHistoryItem } from 'components/HabitHistoryItem';
import { IconButton } from 'components/ui-kit/IconButton';
import { HabitHistoryItem as HabitHistoryItemType } from '../../api/generatedTypes';
import { generateHabitHistoryByQuantity, getDateAfterDays } from 'mock/helpers';

interface HabitProps {
  elementsCount: number;
}

export const Habit = ({ elementsCount }: HabitProps) => {
  const elementsToDisplay = prepareData(habitHistoryData, elementsCount);

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
        {elementsToDisplay.map((habitHistoryElement) => (
          <HabitHistoryItem
            key={habitHistoryElement.id}
            habitHistoryElement={habitHistoryElement}
          />
        ))}
      </div>
    </div>
  );
};

const prepareData = (
  habitHistoryData: HabitHistoryItemType[],
  elementsCount: number
) => {
  const firstElement = habitHistoryData[0];
  const dayOfWeek = new Date(firstElement.date).getDay();
  const daysLeft = 7 - dayOfWeek;
  const futureDate = getDateAfterDays(new Date(firstElement.date), daysLeft);
  const frequency = firstElement.completion_frequency;

  const extraElements = generateHabitHistoryByQuantity({
    quantity: daysLeft,
    startDate: futureDate,
    frequency,
    completionCount: 0,
  });

  const habitHistoryExtra = extraElements.concat(habitHistoryData);
  const trimmedHabitHistory = habitHistoryExtra.filter(
    (_item, index) => index < elementsCount
  );

  return trimmedHabitHistory;
};
