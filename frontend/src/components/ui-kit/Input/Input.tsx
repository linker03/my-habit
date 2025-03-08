import styles from './Input.module.css';
import clcx from 'clsx';

interface InputProps {
  label: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  className?: string;
  inputClassName?: string;
}

export const Input = ({
  label,
  value,
  onChange,
  className = '',
  inputClassName = '',
}: InputProps) => {
  return (
    <label className={clcx(styles.root, className)}>
      {label}
      <input
        className={clcx(styles.input, inputClassName)}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};
