import styles from './ButtonsCollection.module.css';

interface ButtonsCollectionProps {
  label: string;
  children: React.ReactNode;
  collectionClick?(event: React.UIEvent): void;
}

export const ButtonsCollection = ({
  label,
  children,
  collectionClick,
}: ButtonsCollectionProps) => {
  return (
    <div className={styles.root} onClick={collectionClick}>
      {label}
      <div className={styles.container}>{children}</div>
    </div>
  );
};
