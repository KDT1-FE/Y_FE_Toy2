import React, { useEffect, useState } from 'react';
import styles from '@styles/pages/hanging.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getGameData } from '@/api/vote';
import { Ghost } from './Vote';

const Hanging = () => {
  const [user, setUser] = useState<User>({ role: '', name: '' });
  const [searchParams] = useSearchParams();
  const pocketId = searchParams.get('pocketId');
  const chatId = searchParams.get('chatId');
  const role = searchParams.get('role');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await getGameData(pocketId as string);
        const users = gameData.vote;
        const maxCount = Math.max(...users.map((user: Ghost) => user.count));
        const usersWithMaxCount = users.filter(
          (user: Ghost) => user.count === maxCount,
        );

        if (usersWithMaxCount.length === 1) {
          setUser(usersWithMaxCount[0]);
          setTimeout(() => {
            navigate(
              `/result?result=${usersWithMaxCount[0].role}&pocketId=${pocketId}`,
            );
          }, 4000);
        } else {
          navigate(`/reset?pocketId=${pocketId}&chatId=${chatId}&role=${role}`);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.hanging}>
      {user.name && (
        <>
          <p
            className={
              user.role === 'mafia'
                ? `${styles.hanging__result} ${styles.mafia}`
                : `${styles.hanging__result}`
            }>
            {user.name} 님은 <br />
            <span>
              {user.role === 'mafia' ? messageArray[0][0] : messageArray[1][0]}
            </span>
            입니다!!
          </p>
          <p className={styles.hanging__message}>
            {user.role === 'mafia' ? messageArray[0][1] : messageArray[1][1]}
          </p>
          <div className={styles.hanging__tree}></div>
          <div className={styles.hanging__leaves}></div>
        </>
      )}
      {user.role === 'mafia' && <div className={styles.hanging__dancing}></div>}
    </div>
  );
};

export default Hanging;

type User = {
  role: string;
  name: string;
};

const messageArray = [
  ['잔혹한 마피아', '한명이라도 더 죽였어야 했는데!! \n 으익!! 분하다!'],
  ['무고한 시민', '살려줘!! \n 난 아니야... 아니라고 했잖아!!...'],
];
