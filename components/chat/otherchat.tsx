// OtherMessage.js
import React from 'react';
import styles from './Chat.module.scss';

function OtherMessage() {
  return (
    <div className={styles.otherFlex}>
      <div className={styles.userInfo}>
        <img
          src="https://avatars.githubusercontent.com/u/66263916?v=4"
          className={styles.profileImage}
        />
        <span className={styles.username}>이름</span>
      </div>
      <div className={styles.otherMessage}>
        <div className={styles.content}>안녕하세요, 테스트입니다!</div>
        <span>현재시간</span>
      </div>
    </div>
  );
}

export default OtherMessage;
