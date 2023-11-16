// OtherMessage.js
import React, { useEffect, useState } from 'react';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import { User, Message } from '@/@types/types';
import Image from 'next/image';
import styles from './Chat.module.scss';
import Jwtinterceptors from '../../apis/Jwtinterceptors';
import chatAPI from '@/apis/chatAPI';

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
      <div className={styles.userInfo}>
        {userPicture !== '' ? (
          <Image
            alt={'채팅이미지'}
            src={userPicture}
            width={45}
            height={45}
            className={styles.profileImage}
          />
        ) : (
          <p>프로필사진</p>
        )}
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
