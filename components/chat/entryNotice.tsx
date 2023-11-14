import styles from './Chat.module.scss';

interface EntryNoticeProps {
  joiners: string[]; // 새로운 참여자 id
}

export default function EntryNotice({ joiners }: EntryNoticeProps) {
  return (
    <div className={styles.notice}>
      {joiners.map((joinerId, index) => (
        <div key={index} className={styles.box}>
          {joinerId} 님이 입장하셨습니다.
        </div>
      ))}
    </div>
  );
}
