import styles from './Chat.module.scss';

export default function ExitNotice() {
  return (
    <div className={styles.notice}>
      <div className={styles.box}>OOO 님이 퇴장하셨습니다.</div>
    </div>
  );
}
