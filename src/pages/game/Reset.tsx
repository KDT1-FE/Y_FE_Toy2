import { useEffect } from 'react';
import styles from '@styles/pages/reset.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGameData, patchGameResult } from '@/api/vote';

const Reset = () => {
  const [searchParams] = useSearchParams();
  const pocketId = searchParams.get('pocketId');
  const chatId = searchParams.get('chatId');
  const navigate = useNavigate();

  useEffect(() => {
    const setGame = async () => {
      try {
        const gameData = await getGameData(pocketId as string);
        const newData = [...gameData.vote].map((user) => ({
          ...user,
          count: 0,
        }));
        await patchGameResult(pocketId as string, {
          ...gameData,
          vote: newData,
        });
      } catch (error) {
        console.error(error);
      }
    };

    setGame();
    setTimeout(() => {
      navigate(`/chat?chatId=${chatId}&pocketId=${pocketId}`);
    }, 4000);
  }, []);

  return (
    <div className={styles.reset}>
      <p>
        밤 동안 <span>아무 일도</span> <br />
        일어나지 않았습니다...
      </p>
    </div>
  );
};

export default Reset;
