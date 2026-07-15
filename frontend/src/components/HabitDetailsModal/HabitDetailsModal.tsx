import { ModalContainer } from 'components/ModalContainer';
import styles from './HabitDetailsModal.module.css';
import { Button } from 'components/ui-kit/Button';
import { ButtonSizeVariants } from 'components/ui-kit/Button/buttonSizeVariants';
import { HabitWithCompletions } from '../../types/types';

interface HabitDetailsModalProps {
  habit?: HabitWithCompletions;
  isOpen: boolean;
  close(): void;
}

export const HabitDetailsModal = ({
  habit,
  isOpen,
  close,
}: HabitDetailsModalProps) => {
  const targetCount = habit?.frequency ?? 0;
  const completedCount =
    habit?.days[habit?.days.length - 1]?.completedCount ?? 0;

  return (
    <ModalContainer isOpen={isOpen}>
      <div className={styles.root}>
        {habit ? (
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.habitIcon}>
                <img src="/icons/bed.svg" alt="" />
              </div>
              <div className={styles.title}>
                <h4>{habit.name}</h4>
                <p>{habit.description}</p>
              </div>

              <Button onClick={close} className={styles.closeBtn}>
                <img src="/icons/close.svg" alt="" />
              </Button>
            </div>
            <div className={styles.footer}>
              <Button className={styles.completesBtn}>
                Выполнено {completedCount} / {targetCount}
              </Button>
              <Button size={ButtonSizeVariants.LARGE} filled>
                <img src="/icons/calendar.svg" alt="" />
              </Button>
              <Button size={ButtonSizeVariants.LARGE} filled>
                <img src="/icons/edit.svg" alt="" />
              </Button>
              <Button size={ButtonSizeVariants.LARGE} filled>
                <img src="/icons/trash.svg" alt="" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </ModalContainer>
  );
};
