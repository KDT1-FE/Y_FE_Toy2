import styles from './Chat.module.scss';

export default function ChatAlert() {
  return (
    <div className={styles.alert}>
      <div className={styles.box}>내용을 입력해주세요!</div>
    </div>
  );
}
