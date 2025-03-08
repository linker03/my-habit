import { ButtonsCollection } from 'components/ButtonsCollection';
import styles from './IconsCollection.module.css';
import { Button } from 'components/ui-kit/Button';
import clsx from 'clsx';
import { icons } from '../../helpers/icons';

interface IconsCollectionProps {
  value: string;
  onChange(value: string): void;
}

export const IconsCollection = ({ onChange, value }: IconsCollectionProps) => {
  const onButtonClick = (iconName: string) => () => {
    onChange(iconName);
  };

  return (
    <ButtonsCollection label="Иконка">
      {icons.map((item) => (
        <Button
          className={clsx(styles.button, {
            [styles.active]: value === item,
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
