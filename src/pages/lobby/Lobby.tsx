import { useState } from 'react';
import { createPortal } from 'react-dom';

import styles from '@styles/pages/lobby.module.scss';
import LobbyHeader from '@/components/lobby/LobbyHeader';
import Pagination from '@/components/lobby/Pagination';
import Room from '@/components/lobby/Room';
import CreateModal from '@/components/lobby/CreateModal';

const tmpData = [
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c8ede',
    name: '왕초보만 오세요',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T13:18:38.216Z',
    latestMessage: null,
  },
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c8edj',
    name: '조선 컴퓨터는 사절입니다.',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c8edt',
    name: '누가 과연 마피아일까?',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c8eda1',
    name: '끝까지 살아남고야 말겠어!!',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c8e41',
    name: '좀 친다하는 사람 들어오셈',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c833j',
    name: '아무고토상 만들어드림',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-bd7c-0170ee9c866j',
    name: '군대에서 이것만함',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-ba17c-0170ee9c866j',
    name: '군대에서 이것밖에 할게없냐',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
  {
    id: 'f189ab25-5644-4d72-ba17c-0170gje9c866j',
    name: '내가 그린 기린 그림은 마피아',
    users: [
      {
        id: 'user1',
        name: 'lgh',
        picture:
          'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
      },
      {
        id: 'user2',
        name: 'ldj',
        picture:
          'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
      },
    ],
    isPrivate: false,
    updatedAt: '2023-10-31T15:18:38.216Z',
    latestMessage: {
      id: '8f7f67bb-f1ab-4792-9678-0b8546adcb6f',
      text: 'testtest444',
      userId: 'test:test6',
      createdAt: '2023-11-06T11:15:50.588+00:00',
    },
  },
];

const Lobby = ({ userId }): JSX.Element => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [page, setPage] = useState(1);
  const limit: number = 8;
  const offset = (page - 1) * limit;

  const toggleModal = () => {
    setIsModalOpened(!isModalOpened);
  };

  return (
    <div className={styles.lobby}>
      <LobbyHeader toggleModal={toggleModal} />
      <Pagination
        total={tmpData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <section className={styles.lobby__rooms}>
        {tmpData.slice(offset, offset + limit).map(({ id, name, users }) => {
          return <Room key={id} name={name} users={users} />;
        })}
      </section>

      {isModalOpened &&
        createPortal(<CreateModal toggleModal={toggleModal} />, document.body)}
    </div>
  );
};

export default Lobby;

type ResponseValue = Chat[];

interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}
