import styles from './Chat.module.scss';

export default function ExitNotice({ leaver }: { leaver: string }) {
  return (
    <div className={styles.notice}>
      <div className={styles.box}>{leaver} 님이 퇴장하셨습니다.</div>
    </div>
  );
}
