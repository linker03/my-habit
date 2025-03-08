import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children?: React.ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps): React.ReactPortal => {
  const el = document.getElementById('modals-container') as Element;
  return createPortal(children, el);
};

export default ModalPortal;
