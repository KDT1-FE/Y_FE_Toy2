// OtherMessage.js
import React from 'react';
import styles from './Chat.module.scss';
import { Message } from '../../@types/types';

function OtherMessage({ msg }: { msg: Message }) {

  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  const timeString = new Date(msg.createdAt).toLocaleTimeString('ko-KR', options);
  const formattedTime = timeString.replace('오전', '오전 ').replace('오후', '오후 ');
  return (
    <div className={styles.otherFlex}>
      {/* <div className={styles.userInfo}>
        <img
          src="https://avatars.githubusercontent.com/u/66263916?v=4"
          className={styles.profileImage}
        />
        <span className={styles.username}>이름</span>
      </div> */}
      <div className={styles.otherMessage}>
        <span>{formattedTime}</span>
        <div className={styles.content}>{msg.text}</div>
      </div>
    </div>
  );
}

export default OtherMessage;