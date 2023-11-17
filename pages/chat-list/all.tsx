import { Chat } from '@/@types/types';
import { useEffect, useState } from 'react';
import { sortChatList } from '@/utils/chatList';
import useConnectServerSocket from '@/hooks/useConnectServerSocket';
import { Header } from '@/components/Common';
import {
  AllChatListItem,
  ChatListModal,
  CreateChatButton,
} from '@/components/ChatList';
import { GetServerSidePropsContext } from 'next';
import authorizeFetch from '@/utils/authorizeFetch';
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const accessToken = context.req.cookies.ACCESS_TOKEN;
  const refreshToken = context.req.cookies.REFRESH_TOKEN;

  if (accessToken && refreshToken) {
    const response = await authorizeFetch({
      accessToken,
      refreshToken,
    });
    return {
      props: { userData: response.data },
    };
  }
  if (!refreshToken) {
    // accessToken이 없으면 로그인 페이지로 리다이렉트
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
