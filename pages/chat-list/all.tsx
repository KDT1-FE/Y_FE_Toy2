import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Chat } from '@/@types/types';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { userIdState } from '@/recoil/atoms/userIdState';
import formatTime from '@/utils/timeFormat';
import { sortChatList } from '@/utils/chatList';
import useConnectServerSocket from '@/hooks/useConnectServerSocket';
import Header from '@/components/Header/Header';
import {
  ChatListModal,
  CreateChatButton,
  JudgeWrapper,
} from '@/components/ChatList';
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';

export default function AllChatList() {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);
  const [allChatList, setAllChatList] = useState<Chat[]>([]);
  const getAllChat = async () => {
    const allChats: Chat[] = (await chatListAPI.getAllChatList()).data.chats;
    const sortedAllChatList = sortChatList(allChats);
    setAllChatList(sortedAllChatList);
  };
  useEffect(() => {
    getAllChat();
    const timer = setInterval(() => {
      getAllChat();
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const participateChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target instanceof HTMLButtonElement) {
      await chatListAPI.participateChat(e.target.id);
      router.push({
        pathname: `/chat/${e.target.id}`,
        query: { name: e.target.name },
      });
    }
  };

  const userId = useRecoilValue(userIdState);
  const checkIncluded = (element: { id: string }) => {
    if (element.id === userId) {
      return true;
    }
    return false;
  };

  const handleModal = () => {
    setIsModal(!isModal);
  };
  const serverSocket = useConnectServerSocket();
  useEffect(() => {
    serverSocket.on('new-chat', ({ responseChat }) => {
      setAllChatList(preState => [responseChat, ...preState]);
    });
    return () => {
      serverSocket.off('new-chat');
    };
  }, []);

  return (
    <div className={styles.allContainer}>
      <Header pageName="All" />
      <CreateChatButton setIsModal={setIsModal} />
      {isModal && <ChatListModal handleModal={handleModal} />}
      <ul>
        {allChatList.map(chat => {
          const { timeDiffText, className } = formatTime(chat.updatedAt);
          const isincluded = chat.users.some(checkIncluded);
          return (
            <li key={chat.id}>
              <JudgeWrapper isincluded={isincluded} chatId={chat.id}>
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
                      <span className={styles['user-length']}>
                        {chat.users.length}
                      </span>
                      <div className={styles.chat_updated}>
                        <span className={styles[className]}>
                          {timeDiffText}
                        </span>
                      </div>
                    </div>
                    <div className={styles.chatLastestMesaage}>
                      {chat.latestMessage?.text}
                    </div>
                  </div>
                  <div className={styles.right}>
                    {/* <div className={styles.chat_updated}>
                    {isToday === dateString ? formattedTime : `${dateString}`}
                  </div> */}
                    {!isincluded && (
                      <button
                        type="button"
                        id={chat.id}
                        name={chat.name}
                        onClick={participateChat}
                      >
                        참여
                      </button>
                    )}
                  </div>
                </div>
              </JudgeWrapper>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
