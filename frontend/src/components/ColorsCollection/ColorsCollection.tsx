import clsx from 'clsx';
import { ButtonsCollection } from 'components/ButtonsCollection';
import { Button } from 'components/ui-kit/Button';
import styles from './ColorsCollection.module.css';
import { colors } from '../../helpers/colors';

interface ColorsCollectionProps {
  value: string;
  onChange(value: string): void;
}

export const ColorsCollection = ({
  onChange,
  value,
}: ColorsCollectionProps) => {
  const onButtonClick = (iconName: string) => () => {
    onChange(iconName);
  };
  return (
    <ButtonsCollection label="Иконка">
      {colors.map((item) => (
        <Button
          className={clsx(styles.button, {
            [styles.active]: value === item,
          })}
          onClick={onButtonClick(item)}
          data-icon={item}
          key={item}
          style={{ backgroundColor: item }}
        />
      ))}
    </ButtonsCollection>
  );
};
