import React from 'react';

import styles from '@styles/components/lobby/lobbyHeader.module.scss';
import UserImg from './UserImg';

const LobbyHeader = ({ toggleModal }: Props): JSX.Element => {
  return (
    <header className={styles.header}>
      <h1>Mafia</h1>
      <div className={styles.header__right}>
        <button className={styles.header__right__btn} onClick={toggleModal}>
          방 만들기
        </button>
        <UserImg /> {/*이거 왜 컴포넌트로 만들었누 뺴삼 */}
      </div>
    </header>
  );
};

export default LobbyHeader;

interface Props {
  toggleModal: () => void;
}
