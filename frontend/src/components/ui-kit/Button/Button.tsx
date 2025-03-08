import styles from './Button.module.css';
import clcx from 'clsx';
import { ButtonSizeVariants } from './buttonSizeVariants';

interface ButtonProps extends React.ComponentProps<'button'> {
  className?: string;
  children?: React.ReactNode;
  size?: ButtonSizeVariants;
  filled?: boolean;
}

export const Button = ({
  className = '',
  children,
  size = ButtonSizeVariants.MIDDLE,
  filled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clcx(
        styles.root,
        {
          [styles.middle]: size === ButtonSizeVariants.MIDDLE,
          [styles.large]: size === ButtonSizeVariants.LARGE,
          [styles.filled]: filled,
        },
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
