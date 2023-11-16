import { Chat } from '@/@types/types';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from '../../pages/chat-list/ChatList.module.scss';

interface Props {
  chat: Chat;
}

export default function MyChatListItem({ chat }: Props) {
  const today = new Date();
  const isToday = today.toISOString().split('T')[0];

  const dateString = todayDate(chat.updatedAt);
  const formattedTime = formattingTime(chat.updatedAt);
  return (
    <li key={chat.id} className={styles.itemContainer}>
      <Link href={`/chat/${chat.id}`} className={styles.container}>
        <Image
          alt={`${chat.users[0].username}의 프로필 사진`}
          src={chat.users[0].picture}
          width={45}
          height={45}
          className={styles.user_profile}
        />
        <div className={styles.chatInfo}>
          <div className={styles.chatWrap}>
            <div className={styles.chatNameWrap}>
              <div className={styles.chatName}>{chat.name}</div>
              <span className={styles['user-length']}>{chat.users.length}</span>
            </div>
            <div className={styles.chatLastestMesaage}>
              {chat.latestMessage?.text}
            </div>
          </div>
          <div className={styles.chat_updated}>
            {isToday === dateString ? formattedTime : `${dateString}`}
          </div>
        </div>
      </Link>
    </li>
  );
}
