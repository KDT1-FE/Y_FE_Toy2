import React, { useState } from 'react';
import styles from '@styles/components/ghostList.module.scss';
import { Ghost } from '@/pages/game/Vote';
import GhostItem from '@components/vote/GhostItem';

const GhostList = () => {
  const [isSelected, setIsSelected] = useState('');
  return (
    <ul className={styles.ghosts}>
      {ghosts.map((ghost) => (
        <GhostItem
          key={ghost.id}
          ghost={ghost}
          isSelected={isSelected === ghost.id ? true : false}
          handleIsSelected={setIsSelected}
        />
      ))}
    </ul>
  );
};

export default GhostList;

// 더미 데이터
const ghosts: Ghost[] = [
  {
    id: 'user1',
    role: 'mafia',
    name: '첫 번째 유령',
    picture:
      'https://i.pinimg.com/564x/a7/99/96/a79996fd63dbb958d65384bbf49a59df.jpg',
  },
  {
    id: 'user2',
    role: 'mafia',
    name: '두 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user3',
    role: 'mafia',
    name: '세 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user4',
    role: 'doctor',
    name: '네 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user5',
    role: 'citizen',
    name: '다섯 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user6',
    role: 'citizen',
    name: '여섯 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user7',
    role: 'citizen',
    name: '일곱 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user8',
    role: 'citizen',
    name: '여덟 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user9',
    role: 'citizen',
    name: '아홉 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user10',
    role: 'citizen',
    name: '열 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
];
