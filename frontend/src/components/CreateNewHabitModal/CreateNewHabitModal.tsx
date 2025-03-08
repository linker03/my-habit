import { ModalContainer } from 'components/ModalContainer';
import styles from './CreateNewHabitModal.module.css';
import { ModalHeader } from 'components/ModalHeader';
import { Input } from 'components/ui-kit/Input';
import { useState } from 'react';
import { InputNumber } from 'components/InputNumber';
import { IconsCollection } from 'components/IconsCollection';
import { ColorsCollection } from 'components/ColorsCollection';
import { icons } from '../../helpers/icons';
import { colors } from '../../helpers/colors';

interface CreateNewHabitModalProps {
  isOpen: boolean;
  close(): void;
  defaultValues?: HabitCreateRequest;
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
  defaultValues,
}: CreateNewHabitModalProps) => {
  const [name, setName] = useState(defaultValues?.name || '');
  const [description, setDescription] = useState(
    defaultValues?.description || ''
  );
  const [numberOfRepeat, setNumberOfRepeat] = useState(
    defaultValues?.numberOfRepeat || 0
  );
  const [icon, setIcon] = useState(defaultValues?.icon || icons[0]);
  const [color, setColor] = useState(defaultValues?.color || colors[0]);

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
          <IconsCollection onChange={onIconChange} value={icon} />
          <ColorsCollection onChange={onColorChange} value={color} />
        </div>
      </div>
    </ModalContainer>
  );
};
