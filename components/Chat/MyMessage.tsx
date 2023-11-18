import React from 'react';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import { Message } from '@/@types/types';
import styles from './Chat.module.scss';

export default function MyMessage({ msg }: { msg: Message }) {
  const today = new Date();
  const isToday = today.toISOString().split('T')[0];
  const dateString = todayDate(msg.createdAt);
  const formattedTime = formattingTime(msg.createdAt);

  return (
    <div className={styles.myFlex}>
      <div className={styles.myMessage}>
        <span>
          {isToday === dateString
            ? `${formattedTime}`
            : `${dateString} ${formattedTime}`}
        </span>
        <div className={styles.content}>{msg.text}</div>
      </div>
    </div>
  );
}
