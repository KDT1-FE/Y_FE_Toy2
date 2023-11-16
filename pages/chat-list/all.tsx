import { useEffect, useState } from 'react';
import { Chat } from '@/@types/types';
import { sortChatList } from '@/utils/chatList';
import useConnectServerSocket from '@/hooks/useConnectServerSocket';
import Header from '@/components/Common/Header/Header';
import {
  ChatListModal,
  CreateChatButton,
  AllChatListItem,
} from '@/components/ChatList';
import chatListAPI from '../../apis/chatListAPI';
import styles from '../../components/ChatList/ChatList.module.scss';

export default function AllChatList() {
  const [allChatList, setAllChatList] = useState<Chat[]>([]);

  const getAllChat = async () => {
    const allChats: Chat[] = (await chatListAPI.getAllChatList()).data.chats;
    const sortedAllChatList = sortChatList(allChats);
    setAllChatList(sortedAllChatList);
  };

  // 30초마다 채팅방 목록 재요청
  useEffect(() => {
    getAllChat();
    const timer = setInterval(() => {
      getAllChat();
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const [isModal, setIsModal] = useState(false);

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
  }, [serverSocket]);

  return (
    <div>
      <Header pageName="오픈채팅" />
      <ul className={styles.list_container}>
        {allChatList.map(chat => (
          <AllChatListItem key={chat.id} chat={chat} />
        ))}
      </ul>
      <CreateChatButton setIsModal={setIsModal} />
      {isModal && <ChatListModal handleModal={handleModal} />}
    </div>
  );
}
