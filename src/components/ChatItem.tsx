import React, { useEffect, useState } from 'react';
import styles from '@styles/components/chatItem.module.scss';
import fastRequest from '@api/fastRequest';
import { useAppSelector } from '@/hooks/redux';

// import { ResponseData } from '@/pages/game/Chat';

const ChatItem = ({
  chatingUserId,
  text,
}: {
  chatingUserId: string;
  text: string;
}) => {
  const [userInfo, setUserInfo] = useState({});
  const userId = useAppSelector((state) => state.userId);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem('access_token');
      const data = await fastRequest.searchUserInfo(chatingUserId, accessToken);
      setUserInfo(data.user);
    };
    fetchData();
  }, []);

  const Mymsg = userId === chatingUserId;

  return (
    <div
      className={
        Mymsg ? styles.selfChatItemContainer : styles.chatItemContainer
      }>
      <div className={styles.chatItem}>
        <img className={styles.chatItemImage} src={userInfo.picture} />
        <p className={styles.chatItemNickname}>{userInfo.name}</p>
      </div>
      <span className={styles.chatItemText}>{text}</span>
    </div>
  );
};

export default ChatItem;
