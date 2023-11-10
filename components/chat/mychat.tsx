// MyMessage.js
import React from 'react';
import styles from './Chat.module.scss';

function MyMessage() {
  return (
    <div className={styles.myFlex}>
      <div className={styles.myMessage}>
        <span>현재시간</span>
        <div className={styles.content}>테스트 메세지입니다. 메세지입니다</div>
      </div>
    </div>
  );
}

export default MyMessage;
