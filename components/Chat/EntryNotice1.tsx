import styles from './Chat1.module.scss';

export default function EntryNotice({ joiner }: { joiner: string }) {
  return (
    <div className={styles.notice}>
      <div className={styles.box}>{joiner} 님이 입장하셨습니다.</div>
    </div>
  );
}
