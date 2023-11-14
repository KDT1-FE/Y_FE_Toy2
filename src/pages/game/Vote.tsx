import React from 'react';
import GameHeader from '@/components/common/GameHeader';
import styles from '@styles/pages/vote.module.scss';
import GhostList from '@/components/vote/GhostList';

const Vote = () => {
  return (
    <div className={styles.vote}>
      <GameHeader timer={10} title={'누가 마피아 유령일까...'} started={true} />
      <GhostList />
      <div className={styles.vote__button}>
        <button>투표 완료</button>
      </div>
    </div>
  );
};

export default Vote;

export type Ghost = {
  id: string;
  role: string;
  name: string;
  picture: string;
};
