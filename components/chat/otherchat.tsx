// OtherMessage.js
import React, { useEffect, useState } from 'react';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import { User, Message } from '@/@types/types';
import Image from 'next/image';
import styles from './Chat.module.scss';
import Jwtinterceptors from '../../apis/Jwtinterceptors';

interface GetUserNameResponseBody {
  user: User;
}

function OtherMessage({ msg }: { msg: Message }) {
  const today = new Date();
  const isToday = today.toISOString().split('T')[0];
  const dateString = todayDate(msg.createdAt);
  const formattedTime = formattingTime(msg.createdAt);

  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const { instance } = Jwtinterceptors();

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await instance.get<GetUserNameResponseBody>(
          `/user?userId=${msg.userId}`,
        );
        setUserName(response.data.user.name);
        setUserPicture(response.data.user.picture);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    getUserName();
  }, []);
  return (
    <div className={styles.otherFlex}>
      <div className={styles.userInfo}>
        <Image
          src={userPicture}
          width={3.5}
          height={3.5}
          className={styles.profileImage}
          alt="채팅"
        />
        <span className={styles.username}>{userName}</span>
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
