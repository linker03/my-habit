import { Button } from 'components/ui-kit/Button';
import styles from './Header.module.css';

interface HeaderProps {
  addButtonHandler(): void;
}

export const Header = ({ addButtonHandler }: HeaderProps) => {
  return (
    <header className={styles.root}>
      <h1>Хабиточная</h1>
      <Button className={styles.doneButton} onClick={addButtonHandler}>
        <img src="icons/plus.svg" alt="" />
      </Button>{' '}
    </header>
  );
};
