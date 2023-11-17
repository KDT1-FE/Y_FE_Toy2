import React, { useEffect, useState } from 'react';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import { Message } from '@/@types/types';
import Image from 'next/image';
import chatAPI from '@/apis/chatAPI';
import styles from './Chat.module.scss';

export default function OtherMessage({
  msg,
  prevUserId,
}: {
  msg: Message;
  prevUserId: string | null;
}) {
  const today = new Date();
  const isToday = today.toISOString().split('T')[0];
  const dateString = todayDate(msg.createdAt);
  const formattedTime = formattingTime(msg.createdAt);

  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const isSameUser = msg.userId === prevUserId;

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await chatAPI.getUserInfo(msg.userId);
        setUserName(response.data.user.name);
        setUserPicture(response.data.user.picture);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    getUserName();
  }, [msg.id]);

  return (
    <div className={styles.otherFlex}>
      <div>
        {!isSameUser && userPicture && (
          <div className={styles.userInfo}>
            <Image
              width={35}
              height={35}
              src={userPicture}
              className={styles.profileImage}
              alt="유저사진"
            />

            <span className={styles.username}>{userName}</span>
          </div>
        )}
        <div className={styles.otherMessage}>
          <div className={styles.content}>{msg.text}</div>
          <span>
            {isToday === dateString
              ? `${formattedTime}`
              : `${dateString} ${formattedTime}`}
          </span>
        </div>
      </div>
    </div>
  );
}
