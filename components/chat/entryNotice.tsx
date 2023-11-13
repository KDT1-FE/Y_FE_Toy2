import styles from './Chat.module.scss';

export default function EntryNotice() {
  return (
    <div className={styles.notice}>
      <div className={styles.box}>OOO 님이 입장하셨습니다.</div>
    </div>
  );
}
