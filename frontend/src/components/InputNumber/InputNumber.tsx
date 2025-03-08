import { Button } from 'components/ui-kit/Button';
import styles from './InputNumber.module.css';

interface InputNumberProps {
  value: number;
  increment(): void;
  decrement(): void;
  label: string;
}

export const InputNumber = ({
  value,
  increment,
  decrement,
  label,
}: InputNumberProps) => {
  return (
    <div className={styles.root}>
      {label}
      <div className={styles.container}>
        <p className={styles.field}>{value} / День</p>
        <Button className={styles.controlButton} onClick={increment}>
          +
        </Button>
        <Button
          disabled={value === 0}
          className={styles.controlButton}
          onClick={decrement}
        >
          -
        </Button>
      </div>
    </div>
  );
};
