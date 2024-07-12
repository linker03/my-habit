import habitHistoryData from 'mock/habitHistoryMock.json';
import styles from './Habit.module.css';
import { HabitHistoryItem } from 'components/HabitHistoryItem';
import { Button } from 'components/ui-kit/Button';
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
        <Button>
          <img src="icons/shopping-cart.svg" alt="" />
        </Button>
        <h4 className={styles.heading}>Habit</h4>
        <Button className={styles.doneButton}>
          <img src="icons/plus.svg" alt="" />
        </Button>
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
