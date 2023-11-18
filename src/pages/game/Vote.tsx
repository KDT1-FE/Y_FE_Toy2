import GameHeader from '@/components/common/GameHeader';
import styles from '@styles/pages/vote.module.scss';
import GhostList from '@/components/vote/GhostList';
import { useSearchParams } from 'react-router-dom';

const Vote = () => {
  const [searchParams] = useSearchParams();
  const pocketId = searchParams.get('pocketId');
  const chatId = searchParams.get('chatId');

  return (
    <div className={styles.vote}>
      <GameHeader
        timer={15}
        title={'누가 마피아 유령일까...'}
        next="night"
        pocketId={pocketId}
        chatId={chatId}
      />
      <GhostList pocketId={pocketId} />
    </div>
  );
};

export default Vote;

export type Ghost = {
  id: string;
  name: string;
  count: number;
  role: string;
  picture: string;
};
