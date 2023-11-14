import React from 'react';
import { Ghost } from '../../pages/game/Vote';
import GhostItem from './GhostItem';
import styles from '@styles/components/ghostList.module.scss';

const GhostList = ({ ghosts }: { ghosts: Ghost[] }) => {
  return (
    <ul className={styles.ghosts}>
      {ghosts.map((ghost) => (
        <GhostItem key={ghost.id} ghost={ghost} />
      ))}
    </ul>
  );
};

export default GhostList;
