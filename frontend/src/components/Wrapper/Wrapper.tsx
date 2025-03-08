import styles from './Wrapper.module.css';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <main className={styles.root}>
      <div className={styles.habitsContainer}>{children}</div>
    </main>
  );
};
