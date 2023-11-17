import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from '@styles/pages/lobby.module.scss';
import LobbyHeader from '@/components/lobby/LobbyHeader';
import Pagination from '@/components/lobby/Pagination';
import Room from '@/components/lobby/Room';
import CreateModal from '@/components/lobby/CreateModal';
import fastRequest from '@/api/fastRequest';

const Lobby = (): JSX.Element => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [rooms, setRooms] = useState([]);
  const limit: number = 8;
  const offset = (page - 1) * limit;

  const toggleModal = () => {
    setIsModalOpened(!isModalOpened);
  };

  const getAllChat = async () => {
    try {
      const data = await fastRequest.searchAllChat();
      setRooms(data.chats);

      console.log(data.chats);
    } catch (error) {
      console.error('getAllChat 오류');
    }
  };

  useEffect(() => {
    getAllChat();
  }, []);

  return (
    <div className={styles.lobby}>
      <LobbyHeader toggleModal={toggleModal} />
      <Pagination
        total={rooms.length}
        limit={limit}
        page={page}
        setPage={setPage}
        getAllChat={getAllChat}
      />
      <section className={styles.lobby__rooms}>
        {rooms.slice(offset, offset + limit).map(({ id, name, users }) => {
          return <Room key={id} chatId={id} name={name} users={users} />;
        })}
      </section>

      {isModalOpened &&
        createPortal(<CreateModal toggleModal={toggleModal} />, document.body)}
    </div>
  );
};

export default Lobby;

// interface UserInfo {
//   user: User;
// }

// interface User {
//   id: string;
//   name: string;
//   picture: string;
// }

// type ResponseValue = Chat[];

// interface Chat {
//   id: string;
//   name: string;
//   users: User[]; // 속한 유저 정보
//   isPrivate: boolean;
//   latestMessage: Message | null;
//   updatedAt: Date;
// }

// interface User {
//   id: string;
//   name: string;
//   picture: string;
// }

// interface Message {
//   id: string;
//   text: string;
//   userId: string;
//   createAt: Date;
// }
