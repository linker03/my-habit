import { ButtonsCollection } from 'components/ButtonsCollection';
import styles from './IconsCollection.module.css';
import { Button } from 'components/ui-kit/Button';
import { useState } from 'react';
import clsx from 'clsx';

interface IconsCollectionProps {
  onChange(value: string): void;
}

export const IconsCollection = ({ onChange }: IconsCollectionProps) => {
  const [currentIcon, setCurrentIcon] = useState('bed');

  const onButtonClick = (iconName: string) => () => {
    setCurrentIcon(iconName);
    onChange(iconName);
  };

  return (
    <ButtonsCollection label="Иконка">
      {icons.map((item) => (
        <Button
          className={clsx(styles.button, {
            [styles.active]: currentIcon === item,
          })}
          onClick={onButtonClick(item)}
          data-icon={item}
          key={item}
        >
          <img src={`/icons/${item}.svg`} />
        </Button>
      ))}
    </ButtonsCollection>
  );
};

const icons = [
  'bar-chart',
  'bed',
  'bike',
  'calendar',
  'checklist',
  'close',
  'done',
  'edit',
  'fitness-center',
  'flight',
  'hiking',
  'medication',
  'paid',
  'plus',
  'pool',
  'self-improvement',
  'shopping-bag',
  'shopping-cart',
  'sports-gymnastics',
];
