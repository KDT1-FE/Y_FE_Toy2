import { useRef } from 'react';
import { BsXCircle } from 'react-icons/bs';
import useOnClickOutside from '@/hooks/useOnClickOustside';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    onClose();
  });
  return (
    <div className={styles.ModalBox} ref={ref}>
      <BsXCircle className={styles['close-icon']} onClick={onClose} />
      {children}
    </div>
  );
}
