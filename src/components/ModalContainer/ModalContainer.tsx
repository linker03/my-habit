import clsx from 'clsx';

import { ModalPortal } from '../ModalPortal';
import styles from './ModalContainer.module.css';
import { useLockBodyScrollModified } from 'hooks/useLockBodyScrollModified';
import { useModalAppearing } from 'hooks/useModalAppearing';

interface ModalContainerProps {
  isOpen: boolean;
  containerClassName?: string;
  mountingClassName?: string;
  hidingClassName?: string;
  children: React.ReactNode;
}

const ModalContainer = ({
  isOpen,
  containerClassName = '',
  mountingClassName = '',
  hidingClassName = '',
  children,
}: ModalContainerProps) => {
  const { isVisible, mounting, hiding } = useModalAppearing({ isOpen });
  useLockBodyScrollModified(isOpen);

  if (!isVisible) return null;

  return (
    <ModalPortal>
      <div
        className={clsx(styles.root, containerClassName, {
          [styles.show]: mounting,
          [styles.hide]: hiding,
          [mountingClassName]: mounting,
          [hidingClassName]: hiding,
        })}
      >
        {children}
      </div>
    </ModalPortal>
  );
};

export default ModalContainer;
