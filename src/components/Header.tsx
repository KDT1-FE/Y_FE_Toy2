import React, { useState } from 'react';
import styles from '@styles/components/header.module.scss';

const Header = ({ started, title, timer }: HeaderProps) => {
  const [isStart, setIsStart] = useState(!started);

  if (!isStart) {
    return (
      <header className={styles.header}>
        <p className={styles.header__title}>
          {title} <button className={styles.header__button}>🚪</button>
        </p>
        <button
          className={styles.header__button}
          onClick={() => {
            setIsStart(true);
          }}>
          게임시작
        </button>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <span>남은시간 : {timer}초</span>
      <p className={styles.header__title}>{title}</p>
      <p></p>
    </header>
  );
};

export default Header;

type HeaderProps = {
  started: boolean;
  title: string;
  timer?: number;
};
