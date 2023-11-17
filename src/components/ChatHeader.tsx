import React from 'react';
import styles from '@styles/components/chatHeader.module.scss';

const ChatHeader: React.FC<HeaderProps> = ({
  currentPlayers,
  totalPlayers,
}) => {
  return (
    <header className={styles.header}>
      <p className={styles.p}>
        현재인원: {currentPlayers} / {totalPlayers}
      </p>
      <button
        className={styles.button}
        disabled={currentPlayers < totalPlayers}>
        게임 시작
      </button>
    </header>
  );
};

export default ChatHeader;

interface HeaderProps {
  currentPlayers: number;
  totalPlayers: number;
}
