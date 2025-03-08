import { ModalContainer } from 'components/ModalContainer';
import styles from './HabitDetailsModal.module.css';
import { Button } from 'components/ui-kit/Button';
import { ButtonSizeVariants } from 'components/ui-kit/Button/buttonSizeVariants';

interface HabitDetailsModalProps {
  isOpen: boolean;
  close(): void;
}

export const HabitDetailsModal = ({
  isOpen,
  close,
}: HabitDetailsModalProps) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.habitIcon}>
              <img src="/icons/bed.svg" alt="" />
            </div>
            <div className={styles.title}>
              <h4>Спать</h4>
              <p>Спать на кровати ночью</p>
            </div>

            <Button onClick={close} className={styles.closeBtn}>
              <img src="/icons/close.svg" alt="" />
            </Button>
          </div>
          <div className={styles.footer}>
            <Button className={styles.completesBtn}>Выполнено 1 / 1</Button>
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
      </div>
    </ModalContainer>
  );
};
