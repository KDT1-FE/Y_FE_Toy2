import React from 'react';
import GameHeader from '@/components/common/GameHeader';
import styles from '@styles/pages/vote.module.scss';
import GhostList from '@/components/vote/GhostList';

const Vote = () => {
  return (
    <div className={styles.vote}>
      <GameHeader timer={10} title={'누가 마피아 유령일까...'} started={true} />
      <GhostList ghosts={ghosts} />
      <div className={styles.vote__button}>
        <button>투표 완료</button>
      </div>
    </div>
  );
};

export default Vote;

export type Ghost = {
  id: string;
  name: string;
  picture: string;
};

// 더미 데이터
const ghosts: Ghost[] = [
  {
    id: 'user1',
    name: '첫 번째 유령',
    picture:
      'https://i.pinimg.com/564x/a7/99/96/a79996fd63dbb958d65384bbf49a59df.jpg',
  },
  {
    id: 'user2',
    name: '두 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user3',
    name: '세 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user4',
    name: '네 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user5',
    name: '다섯 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user6',
    name: '여섯 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user7',
    name: '일곱 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user8',
    name: '여덟 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
  {
    id: 'user9',
    name: '아홉 번째 유령',
    picture:
      'https://gravatar.com/avatar/c274467c5ef4fe381b154a20c5e7ce26?s=200&d=retro',
  },
  {
    id: 'user10',
    name: '열 번째 유령',
    picture:
      'https://gravatar.com/avatar/d94869409b4e94903723612a4f93a6f9?s=200&d=retro',
  },
];
