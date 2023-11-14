import React, { useEffect, useState } from 'react';
import styles from '@styles/pages/hanging.module.scss';

const Hanging = () => {
  const { role, name } = user;
  const [message, setMessage] = useState<string[]>([]);

  useEffect(() => {
    switch (role) {
      case 'mafia':
        setMessage([
          '잔혹한 마피아',
          '한명이라도 더 죽였어야 했는데!! \n 으익!! 분하다!',
        ]);
        break;
      case 'citizen':
        setMessage([
          '무고한 시민',
          '살려줘!! \n 난 아니야... 아니라고 했잖아!!...',
        ]);
        break;
      case 'doctor':
        setMessage(['의사', '나를 살릴걸!! 나를 살릴거얼!!']);
        break;
      default:
    }
  }, []);

  return (
    <div className={styles.hanging}>
      <p
        className={
          role === 'mafia'
            ? `${styles.hanging__result} ${styles.mafia}`
            : `${styles.hanging__result}`
        }>
        {name} 님은 <br />
        <span>{message[0]}</span>
        입니다!!
      </p>
      <p className={styles.hanging__message}>{message[1]}</p>
      <div className={styles.hanging__tree}></div>
      <div className={styles.hanging__leaves}></div>
      {role === 'mafia' && <div className={styles.hanging__dancing}></div>}
    </div>
  );
};

export default Hanging;

// type Role = 'citizen' | 'doctor' | 'mafia';

// dummy data
const user = {
  id: 'user1',
  role: 'doctor',
  name: '첫 번째 유령',
  picture:
    'https://i.pinimg.com/564x/a7/99/96/a79996fd63dbb958d65384bbf49a59df.jpg',
};
