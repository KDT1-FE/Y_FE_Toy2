import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Chat } from '@/@types/types';
import Image from 'next/image';
import CreateChat from '@/components/ChatList/CreateChat';
import { useRecoilValue } from 'recoil';
import { userIdState } from '@/recoil/atoms/userIdState';
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';

export default function AllChatList() {
  const router = useRouter();

  const [allChatList, setAllChatList] = useState<Chat[]>([]);
  const getAllChat = async () => {
    const chatAllList = await chatListAPI.getAllChatList();
    setAllChatList(chatAllList.data.chats);
  };
  useEffect(() => {
    getAllChat();
  }, []);

  const participateChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      await chatListAPI.participateChat(e.target.name);
      router.push(`/chat/${e.target.name}`);
    }
  };

  const userId = useRecoilValue(userIdState);
  const checkIncluded = (element: { id: string }) => {
    if (element.id === userId) {
      return true;
    }
    return false;
  };

  const routerChat = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const today = new Date();
  const isToday = today.toISOString().split('T')[0];


  return (
    <ul>
      <CreateChat />
      {allChatList.map(chat => {
        const isincluded = chat.users.some(checkIncluded);
        const dateString = todayDate(chat.updatedAt);
        const formattedTime = formattingTime(chat.updatedAt);
        return (
          <li key={chat.id}>
            <Link
              href={{
                pathname: `/chat/${chat.id}`,
                query: { name: chat.name },
              }}
              className={styles.container}
              onClick={isincluded ? undefined : routerChat}
            >
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
                  <div className={styles.chat_updated}>{isToday === dateString ? formattedTime : `${dateString}`}</div>
                  {!isincluded && (
                    <button
                      type="button"
                      name={chat.id}
                      onClick={participateChat}
                    >
                      참여
                    </button>
                  )}
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
