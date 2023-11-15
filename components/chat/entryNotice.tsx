import styles from './Chat.module.scss';

interface EntryNoticeProps {
  joiners: string[]; // 새로운 참여자 id
}

export default function EntryNotice({ joiners }: EntryNoticeProps) {
  const firstJoiner = joiners[0];

  if (!firstJoiner) {
    return null;
  }

  const userId = firstJoiner.id.split(':')[1]; // 'id' 값에서 콜론(:)을 기준으로 분리하여 두 번째 요소를 추출

  return (
    <div className={styles.notice}>
      <div className={styles.box}>{userId} 님이 입장하셨습니다.</div>
    </div>
  );
}
