import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Chat } from '@/@types/types';
import Image from 'next/image';
import CreateChat from '@/components/ChatList/CreateChat';
import chatListAPI from '../../apis/chatListAPI';
import styles from '../../styles/pages/ChatList.module.scss';

export default function MyChatList() {
  const [myChatList, setMyChatList] = useState<Chat[]>([]);
  const getMyChat = async () => {
    const ChatMyList = await chatListAPI.getMyChatList();
    setMyChatList(ChatMyList.data.chats);
  };
  useEffect(() => {
    getMyChat();
  }, []);
  return (
    <>
      <CreateChat />
      {myChatList.map(chat => (
        <li key={chat.id}>
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
                  <span>{chat.users.length}</span>
                </div>
                <div className={styles.chatLastestMesaage}>
                  {chat.latestMessage?.text}
                </div>
              </div>
              <div>
                <div className={styles.chat_updated}>{chat.updatedAt}</div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </>
  );
}
