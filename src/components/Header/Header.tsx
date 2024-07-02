import { IconButton } from 'components/ui-kit/IconButton';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.root}>
      <h1>Хабиточная</h1>
      <IconButton className={styles.iconButton}>
        <img src="icons/plus.svg" alt="" />
      </IconButton>{' '}
    </header>
  );
};
