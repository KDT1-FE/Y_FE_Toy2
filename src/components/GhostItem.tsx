import React from 'react';
import { Ghost } from '../pages/game/Vote';
import styles from '@styles/components/ghostitem.module.scss';

const GhostItem = ({ ghost }: { ghost: Ghost }) => {
  return (
    <li className={styles.ghost}>
      <div className={styles.ghost__image}>
        <img src={ghost.picture} alt={`${ghost.name}님의 프로필`} />
      </div>
      <div className={styles.ghost__name}>{ghost.name}</div>
    </li>
  );
};

export default GhostItem;
