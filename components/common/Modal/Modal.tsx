import { BsXCircle } from 'react-icons/bs';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className={styles.ModalBox}>
      <BsXCircle className={styles['close-icon']} onClick={onClose} />
      {children}
    </div>
  );
}
