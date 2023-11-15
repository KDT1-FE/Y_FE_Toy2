import React, { useEffect, useState } from 'react';
import GameHeader from '@/components/common/GameHeader';
import styles from '@styles/pages/vote.module.scss';
import GhostList from '@/components/vote/GhostList';
import { getGameData } from '@/api/vote';
import { useParams } from 'react-router-dom';

const Vote = () => {
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const params = useParams();
  const chatId = params.id;

  useEffect(() => {
    const setData = async () => {
      try {
        const gameData = await getGameData(chatId as string);
        setGhosts(gameData.vote);
      } catch (error) {
        console.error(error);
      }
    };
    setData();
  }, []);

  return (
    <div className={styles.vote}>
      <GameHeader timer={10} title={'누가 마피아 유령일까...'} started={true} />
      <GhostList ghosts={ghosts} />
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
