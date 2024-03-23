import styles from './IconButton.module.css';
import clcx from 'clsx';

interface IconButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const IconButton = ({ className = '', children }: IconButtonProps) => {
  return <button className={clcx(styles.root, className)}>{children}</button>;
};
