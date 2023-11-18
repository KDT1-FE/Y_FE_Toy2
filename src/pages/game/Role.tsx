import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import unidentified from '@/assets/images/unidentified.gif';
import roleSchema from '@/utils/role/schema';

import styles from '@/styles/pages/role.module.scss';
import pocketRequest from '@/api/pocketRequest';

const Role = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoding] = useState(true);
  const [role, setRole] = useState('citizen');
  const userId = useAppSelector((state) => state.userId);
  const userInfo = useAppSelector((state) => state.userInfo.user);
  const [query] = useSearchParams();
  const chatId = query.get('chatId');
  const pocketId = query.get('pocketId');

  const setMafia = async () => {
    try {
      const gameInfo = await pocketRequest.get('game');
      const pocketInfo = gameInfo.items.filter(
        (el: Game) => el.chatId === chatId,
      )[0];

      const restVote = pocketInfo.vote.filter((el: Vote) => el.id !== userId);
      const check = pocketInfo.vote
        .filter((el: Vote, index: number) => {
          if (pocketInfo.mafia.includes(index)) return el.id;
        })
        .map((el: Vote) => el.id);

      if (check.includes(userId)) {
        await pocketRequest.patch('game', pocketInfo.id, {
          vote: [
            ...restVote,
            {
              id: userId,
              name: userInfo.name,
              count: 0,
              role: 'mafia',
              picture: userInfo.picture,
            },
          ],
        });

        setRole('mafia');
        setTimeout(() => {
          navigate(`/chat?chatId=${chatId}&pocketId=${pocketId}&role=mafia`);
        }, 6000);
      } else {
        setTimeout(() => {
          navigate(`/chat?chatId=${chatId}&pocketId=${pocketId}&role=citizen`);
        }, 6000);
      }
    } catch (error) {
      console.error('check mafia error');
    }
  };

  useEffect(() => {
    setMafia();
    setTimeout(() => setIsLoding(false), 3000);
  }, []);

  return (
    <div className={styles.role}>
      <div className={styles.role__message}>
        {isLoading
          ? '유령마을의 모인 사람들의 정체를 파악하고 있습니다.'
          : '끝까지 살아남아주세요!'}
      </div>
      <div className={styles.role__container}>
        <div className={styles.role__container__result}>
          <img
            src={isLoading ? unidentified : roleSchema[role].url}
            alt="정체 이미지"
          />
        </div>
        <div className={styles.role__container__resultMsg}>
          {isLoading
            ? '당신의 정체는...?'
            : `당신은 ${roleSchema[role].value}입니다`}
        </div>
      </div>
    </div>
  );
};

export default Role;

interface Game {
  id: string;
  chatId: string;
  mafia: number;
  vote: Vote[];
}

interface Vote {
  count: number;
  id: string;
  name: string;
  picture: string;
  role: string;
}
