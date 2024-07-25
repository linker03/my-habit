import clsx from 'clsx';
import { ButtonsCollection } from 'components/ButtonsCollection';
import { Button } from 'components/ui-kit/Button';
import { useState } from 'react';
import styles from './ColorsCollection.module.css';

interface ColorsCollectionProps {
  onChange(value: string): void;
}

export const ColorsCollection = ({ onChange }: ColorsCollectionProps) => {
  const [currentColor, setCurrentColor] = useState('#00D49D');

  const onButtonClick = (iconName: string) => () => {
    setCurrentColor(iconName);
    onChange(iconName);
  };
  return (
    <ButtonsCollection label="Иконка">
      {colors.map((item) => (
        <Button
          className={clsx(styles.button, {
            [styles.active]: currentColor === item,
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

const colors = [
  '#00D49D',
  '#61ACF5',
  '#FC79B4',
  '#F178F2',
  '#C184F3',
  '#FF6971',
  '#FF8C49',
  '#FFBB43',
  '#F279F3',
];
