import styles from './Input.module.css';
import clcx from 'clsx';

interface InputProps {
  children: React.ReactNode;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  className?: string;
  inputClassName?: string;
}

export const Input = ({
  children,
  value,
  onChange,
  className = '',
  inputClassName = '',
}: InputProps) => {
  return (
    <label className={clcx(styles.root, className)}>
      {children}
      <input
        className={clcx(styles.input, inputClassName)}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
