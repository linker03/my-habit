import { ModalContainer } from 'components/ModalContainer';
import styles from './CreateNewHabitModal.module.css';
import { ModalHeader } from 'components/ModalHeader';
import { Input } from 'components/ui-kit/Input';
import { useState } from 'react';
import { InputNumber } from 'components/InputNumber';
import { IconsCollection } from 'components/IconsCollection';
import { ColorsCollection } from 'components/ColorsCollection';

interface CreateNewHabitModalProps {
  isOpen: boolean;
  close(): void;
}

type HabitCreateRequest = {
  name: string;
  description: string;
  numberOfRepeat: number;
  icon: string;
  color: string;
};

export const CreateNewHabitModal = ({
  isOpen,
  close,
}: CreateNewHabitModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfRepeat, setNumberOfRepeat] = useState(0);
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');

  const increment = () => {
    setNumberOfRepeat((state) => state + 1);
  };

  const decrement = () => {
    setNumberOfRepeat((state) => state - 1);
  };

  const onIconChange = (value: string) => {
    setIcon(value);
  };

  const onColorChange = (value: string) => {
    setColor(value);
  };

  const onSubmit = () => {
    const values: HabitCreateRequest = {
      name,
      description,
      numberOfRepeat,
      icon,
      color,
    };
    console.log(values);
    close();
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <div className={styles.root}>
        <div className={styles.container}>
          <ModalHeader
            title="Новая привычка"
            closeHandler={close}
            submitHandler={onSubmit}
          />
          <Input
            label="Имя"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Input
            label="Описание"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
          />

          <InputNumber
            value={numberOfRepeat}
            increment={increment}
            decrement={decrement}
            label="Выполнений в день"
          />
          <IconsCollection onChange={onIconChange} />
          <ColorsCollection onChange={onColorChange} />
        </div>
      </div>
    </ModalContainer>
  );
};
