import React from 'react';

import styles from '@styles/pages/lobby.module.scss';
import LobbyHeader from '../../components/LobbyHeader';

const Lobby = () => {
  return (
    <div className={styles.lobby}>
      <LobbyHeader />
    </div>
  );
};

export default Lobby;
