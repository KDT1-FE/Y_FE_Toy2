import React, { useEffect, useState } from 'react';
import styles from '@styles/components/chatItem.module.scss';
import fastRequest from '@api/fastRequest';
// import { ResponseData } from '@/pages/game/Chat';

const ChatItem = ({ userId, text }: { userId: string; text: string }) => {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('access_token');
      const data = await fastRequest.searchUserInfo(userId, accessToken);
      setUserInfo(data.user);
    };
    fetchData();
  }, []);
  return (
    <div className={styles.chatItemContainer}>
      <div className={styles.chatItem}>
        <img className={styles.chatItemImage} src={userInfo.picture} />
        <p className={styles.chatItemNickname}>{userInfo.name}</p>
      </div>
      <span className={styles.chatItemText}>{text}</span>
    </div>
  );
};

export default ChatItem;
