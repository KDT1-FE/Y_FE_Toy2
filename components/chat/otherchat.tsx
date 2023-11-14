// OtherMessage.js
import React, { useEffect, useState } from 'react';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import { User, Message } from '@/@types/types';
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
        const response = await instance.get<GetUserNameResponseBody>(`/user?userId=${msg.userId}`);
        setUserName(response.data.user.name);
        setUserPicture(response.data.user.picture);
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };
  
    getUserName();
  }, [instance, msg.userId]); // 의존성 배열에는 getUserName 함수가 사용하는 모든 변수를 포함시켜야 합니다.
  
  
  return (
    <div className={styles.otherFlex}>
      <div className={styles.userInfo}>
        <img
          src="https://avatars.githubusercontent.com/u/66263916?v=4"
          className={styles.profileImage}
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
