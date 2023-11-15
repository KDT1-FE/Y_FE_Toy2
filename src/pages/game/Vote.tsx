import React from 'react';
import GameHeader from '@/components/common/GameHeader';
import styles from '@styles/pages/vote.module.scss';
import GhostList from '@/components/vote/GhostList';
import { useParams } from 'react-router-dom';

const Vote = () => {
  const params = useParams();
  const chatId = params.id;

  return (
    <div className={styles.vote}>
      <GameHeader timer={10} title={'누가 마피아 유령일까...'} started={true} />
      <GhostList chatId={chatId} />
    </div>
  );
};

export default Vote;

export type Ghost = {
  id: string;
  name: string;
  count: number;
  role: string;
  picture: string;
};
