import { useNavigate } from 'react-router-dom';
import styles from '@styles/components/lobby/room.module.scss';
import { useAppSelector } from '@/hooks/redux';

import fastRequest from '@/api/fastRequest';
import pocketRequest from '@/api/pocketRequest';

const Room = ({ chatId, name, users }: Props) => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.userId);
  const userInfo = useAppSelector((state) => state.userInfo.user);

  const joinRoom = async () => {
    try {
      const gameInfo = await pocketRequest.get(
        'game',
        '',
        `&filter=(chatId='${chatId}')`,
      );
      const roomInfo = gameInfo.items[0];

      if (roomInfo.vote.length >= 4) {
        alert('방이 가득 찼습니다.');
      }

      const fastResponse = await fastRequest.joinChat(
        { chatId },
        localStorage.getItem('access_token') as string,
      );

      const pocketResponse = await pocketRequest.patch('game', roomInfo.id, {
        vote: [
          ...roomInfo.vote,
          {
            id: userId,
            name: userInfo.name,
            count: 0,
            role: 'citizen',
            picture: userInfo.picture,
          },
        ],
      });

      navigate(`/chat?chatId=${chatId}&pocketId=${roomInfo.id}`);

      console.log(
        `fastResponse: ${fastResponse}`,
        `pocketResponse: ${pocketResponse}`,
      );
    } catch (error) {
      console.error(error);
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

interface User {
  id: string;
  name: string;
  picture: string;
}
