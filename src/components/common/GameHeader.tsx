import React, { useEffect, useState } from 'react';
import styles from '@styles/components/gameHeader.module.scss';
import { useNavigate } from 'react-router-dom';

const GameHeader = ({
  title,
  timer,
  next,
  pocketId,
  chatId,
}: GameHeaderProps) => {
  const [time, setTime] = useState<number>(timer);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 1);

      if (time === 0) {
        clearInterval(intervalId);
        navigate(`/${next}?pocketId=${pocketId}&chatId=${chatId}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  return (
    <header className={styles.header}>
      <span>남은시간 : {time}초</span>
      <p className={styles.header__title}>{title}</p>
      <p></p>
    </header>
  );
};

export default GameHeader;

type GameHeaderProps = {
  title: string;
  timer: number;
  next?: string;
  pocketId: string | null;
  chatId?: string | null;
};
