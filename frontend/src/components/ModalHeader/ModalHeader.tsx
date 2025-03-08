import { Button } from 'components/ui-kit/Button';
import styles from './ModalHeader.module.css';
import { ButtonSizeVariants } from 'components/ui-kit/Button/buttonSizeVariants';

interface ModalHeaderProps {
  closeHandler(): void;
  submitHandler(): void;
  title?: string;
}

export const ModalHeader = ({
  closeHandler,
  submitHandler,
  title,
}: ModalHeaderProps) => {
  return (
    <div className={styles.root}>
      <Button
        className={styles.closeButton}
        onClick={closeHandler}
        size={ButtonSizeVariants.LARGE}
      >
        <img src="/icons/close.svg" alt="cross" />
      </Button>
      <h4 className={styles.title}>{title}</h4>
      {submitHandler && (
        <Button
          className={styles.submitButton}
          onClick={submitHandler}
          size={ButtonSizeVariants.LARGE}
        >
          <img src="/icons/done.svg" alt="cross" />
        </Button>
      )}
    </div>
  );
};
