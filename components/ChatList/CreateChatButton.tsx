import styles from './CreateChatButton.module.scss';

interface Props {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateChatButton({ setIsModal }: Props) {
  return (
    <button
      className={styles.chatPlusBtn}
      type="button"
      onClick={() => setIsModal(true)}
    >
      +
    </button>
  );
}
