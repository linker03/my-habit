import habitHistoryData from 'mock/habitHistoryMock.json';
import styles from './HabitElement.module.css';
import { HabitHistoryItem } from 'components/HabitHistoryItem';
import { Button } from 'components/ui-kit/Button';
import { HabitHistoryItem as HabitHistoryItemType } from '../../api/generatedTypes';
import { generateHabitHistoryByQuantity, getDateAfterDays } from 'mock/helpers';
import type { HabitWithCompletions } from '../../types/types';
import { Icon } from 'components/ui-kit/Icon';
import { setToday } from '../../api/habit';

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

  const elementsToDisplay = prepareData(habitHistoryData, elementsCount);

  return (
    <div className={styles.root}>
      <div className={styles.topSide}>
        <Button onClick={openHabitDetailsModal}>
          <Icon name={habit.icon} />
        </Button>
        <h4 className={styles.heading}>{habit.name}</h4>
        <Button className={styles.doneButton} onClick={onComplete}>
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

const prepareData = (
  habitHistoryData: HabitHistoryItemType[],
  elementsCount: number,
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
    (_item, index) => index < elementsCount,
  );

  return trimmedHabitHistory;
};
