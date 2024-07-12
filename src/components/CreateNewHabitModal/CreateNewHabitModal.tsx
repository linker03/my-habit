import { ModalContainer } from 'components/ModalContainer';
import styles from './CreateNewHabitModal.module.css';
import { ModalHeader } from 'components/ModalHeader';
import { Input } from 'components/ui-kit/Input';
import { useState } from 'react';

interface CreateNewHabitModalProps {
  isOpen: boolean;
  close(): void;
}

export const CreateNewHabitModal = ({
  isOpen,
  close,
}: CreateNewHabitModalProps) => {
  const [state, setState] = useState('');
  return (
    <ModalContainer isOpen={isOpen}>
      <div className={styles.root}>
        <div className={styles.container}>
          <ModalHeader
            title="Новая привычка"
            closeHandler={close}
            submitHandler={() => undefined}
          />
          <Input
            value={state}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setState(e.target.value)
            }
          >
            Имя
          </Input>
        </div>
      </div>
    </ModalContainer>
  );
};
