import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IChat } from '@/@types/types';
import Image from 'next/image';
import CreateChat from '@/components/ChatList/CreateChat';
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';

export default function AllChatList() {
  const router = useRouter();

  const [allChatList, setAllChatList] = useState<IChat[]>([]);
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

  const checkIncluded = (element: { id: string }) => {
    //  TODO|서지수 use3 기준이 아닌 로그인 유저 기능으로 수정하기
    if (element.id === 'user3') {
      return true;
    }
    return false;
  };

  const routerChat = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };
  return (
    <ul>
      <CreateChat />
      {allChatList.map(chat => {
        const isincluded = chat.users.some(checkIncluded);
        return (
          <li key={chat.id}>
            <Link
              href={`/chat/${chat.id}`}
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
                  <div className={styles.chat_updated}>{chat.updatedAt}</div>
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
