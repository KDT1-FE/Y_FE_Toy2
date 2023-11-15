import React from 'react';
import { Chat } from '../types/ChatType';
import styles from '@styles/components/chatItem.module.scss';

const ChatItem: React.FC<Chat> = ({ user, text }) => {
  return (
    <div className={styles.chatItemContainer}>
      <div className={styles.chatItem}>
        <img className={styles.chatItemImage} src={user.imageUrl} />
        <p className={styles.chatItemNickname}>{user.nickname}</p>
      </div>
      <span className={styles.chatItemText}>{text}</span>
    </div>
  );
};

export default ChatItem;
