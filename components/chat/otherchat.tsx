// OtherMessage.js
import React from 'react';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import styles from './Chat.module.scss';
import { IMessage } from '../../@types/types';

function OtherMessage({ msg }: { msg: IMessage }) {

  const today = new Date();
  const isToday = today.toISOString().split('T')[0];
  const dateString = todayDate(msg.createdAt);
  const formattedTime = formattingTime(msg.createdAt);

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
        <div className={styles.content}>{msg.text}</div>
        <span>
          {isToday === dateString
            ? `${formattedTime}`
            : `${dateString} ${formattedTime}`}
        </span>
      </div>
    </div>
  );
}

export default OtherMessage;
