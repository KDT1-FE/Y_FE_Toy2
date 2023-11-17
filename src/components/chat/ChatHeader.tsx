import React from 'react';
import styles from '@styles/components/chatHeader.module.scss';
import { useNavigate } from 'react-router-dom';

const ChatHeader = ({
  currentPlayers,
  totalPlayers,
  chatId,
  pocketId,
}: HeaderProps) => {
  const navigate = useNavigate();

  if (currentPlayers === totalPlayers) {
    setTimeout(() => {
      navigate(`/role?chatId=${chatId}&pocketId=${pocketId}`);
    }, 3000);
  }

  return (
    <header className={styles.header}>
      <span>
        현재인원: {currentPlayers} / {totalPlayers}
      </span>
      <p className={styles.header__text}>
        {totalPlayers - currentPlayers}명의 플레이어를 기다리는중..
      </p>
    </header>
  );
};

export default ChatHeader;

interface HeaderProps {
  currentPlayers: number;
  totalPlayers: number;
  chatId: string | null;
  pocketId: string | null;
}
