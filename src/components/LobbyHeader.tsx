import React from 'react';

import styles from '@styles/components/lobbyHeader.module.scss';
import UserImg from './UserImg';

const LobbyHeader = () => {
  return (
    <header className={styles.header}>
      <h1>Mafia</h1>
      <div className={styles.header__right}>
        <button className={styles.header__right__btn}>방 만들기</button>
        <UserImg />
      </div>
    </header>
  );
};

export default LobbyHeader;
