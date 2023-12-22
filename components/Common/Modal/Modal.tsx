import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return <div className={styles.ModalBox}>{children}</div>;
}
