import styles from './IconButton.module.css';
import clcx from 'clsx';

interface IconButtonProps extends React.ComponentProps<'button'> {
  className?: string;
  children?: React.ReactNode;
}

export const IconButton = ({
  className = '',
  children,
  ...rest
}: IconButtonProps) => {
  return (
    <button className={clcx(styles.root, className)} {...rest}>
      {children}
    </button>
  );
};
