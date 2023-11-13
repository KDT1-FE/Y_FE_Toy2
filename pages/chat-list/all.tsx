// import Link from 'next/link';
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
  return (
    <>
      <CreateChat />
      {allChatList.map(chat => (
        // TODO|서지수  참여한 방이면 바로 이동하도록 수정
        // <Link
        //   href={`/chat/${chat.id}`}
        //   key={chat.id}
        //   className={styles.container}
        // >
        <div key={chat.id} className={styles.container}>
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
              {/* TODO|서지수 내가 참여하지 않은 채팅방만 표시하도록 수정 */}
              <button type="button" name={chat.id} onClick={participateChat}>
                참여
              </button>
            </div>
          </div>
        </div>
        // </Link>
      ))}
    </>
  );
}
