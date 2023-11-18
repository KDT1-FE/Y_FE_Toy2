import { useEffect, useState } from 'react';
import styles from '@styles/pages/result.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGameData } from '@/api/vote';
import { Ghost } from './Vote';
import fastRequest from '@/api/fastRequest';

const Result = () => {
  const [show, setShow] = useState(false);
  const [victory, setVictory] = useState(true);
  const [players, setPlayers] = useState<Ghost[]>([]);

  const [searchParams] = useSearchParams();
  const result = searchParams.get('result');
  const pocketId = searchParams.get('pocketId');
  const chatId = searchParams.get('chatId');
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    if (result === 'mafia') {
      setVictory(false);
    }
    if (result === 'citizen') {
      setVictory(true);
    }

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await getGameData(pocketId as string);
        const users = gameData.vote;
        setPlayers(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleClick = async () => {
    await fastRequest.leaveChat(chatId as string, accessToken as string);
    navigate('/lobby');
  };

  return (
    <div className={styles.result}>
      <div className={styles.result__contents}>
        <h1
          className={styles.result__credits}
          style={{ color: `${victory ? 'red' : 'blue'}` }}>
          Credits
        </h1>
        <ul className={styles.result__players}>
          {players.map((player) => (
            <li>
              {player.role === 'magia' ? '잔혹한 마피아' : '무고한 시민'}{' '}
              {player.name}
            </li>
          ))}
        </ul>
        <h1
          className={styles.result__victory_team}
          style={{ color: `${victory ? 'red' : 'blue'}` }}>
          {victory ? '마피아 승리' : '시민 승리'}
        </h1>
        <div className={styles.result__result_text}>
          {victory ? (
            <p>
              시민들은 마피아의 손에 모두 학살 당했습니다.
              <br />
              <br />
              마피아들의 학살은 다시 시작됩니다......
            </p>
          ) : (
            <p>
              시민들은 마피아의 난동 속에서 <br />
              <br /> 마을을 지켜냈습니다.
              <br />
              <br />
              시민들은 평화롭게 일상으로 돌아갔습니다......
            </p>
          )}
        </div>
      </div>
      <div className={styles.result__goback}>
        {show && <button onClick={handleClick}>돌아가기</button>}
      </div>
    </div>
  );
};

export default Result;
