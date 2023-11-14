import React from 'react';
import styles from './Chat.module.scss';
import { IMessage } from '../../@types/types';
import { formattingTime } from '@/utils/formattedTimeData';

function MyMessage({ msg }: { msg: Message }) {

  const formattedTime = formattingTime(msg.createdAt);


  return (
    <div className={styles.myFlex}>
      <div className={styles.myMessage}>
        <span>{new Date(msg.createdAt).toLocaleString()}</span>
        <div className={styles.content}>{msg.text}</div>
      </div>
    </div>
  );
}

export default MyMessage;
