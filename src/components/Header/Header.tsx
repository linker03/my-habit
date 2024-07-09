import { IconButton } from 'components/ui-kit/IconButton';
import styles from './Header.module.css';

interface HeaderProps {
  addButtonHandler(): void;
}

export const Header = ({ addButtonHandler }: HeaderProps) => {
  return (
    <header className={styles.root}>
      <h1>Хабиточная</h1>
      <IconButton className={styles.doneButton} onClick={addButtonHandler}>
        <img src="icons/plus.svg" alt="" />
      </IconButton>{' '}
    </header>
  );
};
