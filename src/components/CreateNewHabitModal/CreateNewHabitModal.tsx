import { ModalContainer } from 'components/ModalContainer';
import styles from './CreateNewHabitModal.module.css';

interface CreateNewHabitModalProps {
  isOpen: boolean;
  close(): void;
}

export const CreateNewHabitModal = ({
  isOpen,
  close,
}: CreateNewHabitModalProps) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div className={styles.root}>
        <div className={styles.container}>
          {' '}
          привет
          <button onClick={close}>close</button>
        </div>
      </div>
    </ModalContainer>
  );
};
