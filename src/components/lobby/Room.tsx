import React from 'react';

import styles from '@styles/components/lobby/room.module.scss';

// 방마다 최대 인원 정보를 서버에 저장하고 가져오는 로직을 추가해야된다.

const room = ({ name, users }: Props) => {
  return (
    <div className={styles.room}>
      <span className={styles.room__name}>{name}</span>
      <div className={styles.room__headcount}>😎{users.length}/10</div>
    </div>
  );
};

export default room;

interface Props {
  name: string;
  users: User[];
}

interface User {
  id: string;
  name: string;
  picture: string;
}
