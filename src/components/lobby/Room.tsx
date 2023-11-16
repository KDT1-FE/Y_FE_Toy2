import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';

import styles from '@styles/components/lobby/room.module.scss';
import fastRequest from '@/api/fastRequest';
import pocketRequest from '@/api/pocketRequest';

// 방마다 최대 인원 정보를 서버에 저장하고 가져오는 로직을 추가해야된다.

const Room = ({ chatId, name, users }: Props) => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.userId);
  const userInfo = useAppSelector((state) => state.userInfo.user);

  const joinRoom = async () => {
    try {
      const gameInfo = await pocketRequest.get('game');
      const pocketInfo = gameInfo.items.filter(
        (el: Game) => el.chatId === chatId,
      )[0];

      if (pocketInfo.vote.length >= 4) return;

      const fastResponse = await fastRequest.joinChat(
        { chatId: chatId },
        localStorage.getItem('access_token') as string,
      );

      const pocketResponse = await pocketRequest.patch('game', pocketInfo.id, {
        vote: [
          ...pocketInfo.vote,
          {
            id: userId,
            name: userInfo.name,
            count: 0,
            role: 'citizen',
            picture: userInfo.picture,
          },
        ],
      });

      navigate(`/chat?chatId=${chatId}&pocketId=${pocketInfo.id}`);

      console.log(
        `fastResponse: ${fastResponse}`,
        `pocketResponse: ${pocketResponse}`,
      );
    } catch (error) {
      console.error('getAllChat 오류');
    }
  };

  const handleClick = async () => {
    await joinRoom();
  };

  return (
    <div className={styles.room} onClick={handleClick}>
      <span className={styles.room__name}>{name}</span>
      <div className={styles.room__headcount}>😎{users.length}/4</div>
    </div>
  );
};

export default Room;

interface Props {
  chatId: string;
  name: string;
  users: User[];
}

// interface UserInfo {
//   user: User;
// }

interface User {
  id: string;
  name: string;
  picture: string;
}

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
