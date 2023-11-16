import React, { useEffect, useState } from 'react';
import styles from '@styles/components/ghostList.module.scss';
import { Ghost } from '@/pages/game/Vote';
import GhostItem from '@components/vote/GhostItem';
import { getGameData, patchGameResult } from '@/api/vote';

const GhostList = ({ pocketId }: { pocketId: string | null }) => {
  const [isSelected, setIsSelected] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState({});
  const [ghosts, setGhosts] = useState<Ghost[]>([]);

  useEffect(() => {
    const setGame = async () => {
      try {
        const gameData = await getGameData(pocketId as string);
        setGhosts(gameData.vote);
        setData(gameData);
      } catch (error) {
        console.error(error);
      }
    };
    setGame();
  }, []);

  const selectMafia = (id: string) => {
    const updateGhost = ghosts.find((ghost) => ghost.id === id);
    const newCount = updateGhost!.count + 1;
    return { ...updateGhost, count: newCount };
  };

  const handleClick = async () => {
    const updateGhost = selectMafia(isSelected);
    const restGhosts = ghosts.filter((ghost) => ghost.id !== isSelected);
    const newData = [...restGhosts, updateGhost];
    await patchGameResult(pocketId as string, { ...data, vote: newData });
    setDisabled(true);
  };

  return (
    <div className={styles.vote}>
      <ul className={styles.ghosts}>
        {ghosts.map((ghost) => (
          <GhostItem
            key={ghost.id}
            ghost={ghost}
            isSelected={isSelected === ghost.id ? true : false}
            handleIsSelected={setIsSelected}
            disabled={disabled}
          />
        ))}
      </ul>
      <div className={styles.ghosts__button}>
        <button onClick={handleClick}>투표 완료</button>
      </div>
    </div>
  );
};

export default GhostList;
