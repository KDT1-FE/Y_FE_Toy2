import React, { useState } from 'react';
import styles from '@styles/components/ghostList.module.scss';
import { Ghost } from '@/pages/game/Vote';
import GhostItem from '@components/vote/GhostItem';

const GhostList = ({ ghosts }: { ghosts: Ghost[] }) => {
  const [isSelected, setIsSelected] = useState('');

  const handleClick = () => {
    console.log(isSelected);
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
