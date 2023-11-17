import { useEffect, useState } from 'react';
import { IoIosChatbubbles } from 'react-icons/io';
import { GetServerSidePropsContext } from 'next';
import { Chat } from '@/@types/types';
import chatListAPI from '@/apis/chatListAPI';
import { filterPrivateChat, sortChatList } from '@/utils/chatList';
import { Header } from '@/components/Common';
import MyChatListItem from '@/components/ChatList/MyChatListItem';
import authorizeFetch from '@/utils/authorizeFetch';
import styles from '../../components/ChatList/ChatList.module.scss';

export default function MyChatList() {
  const [myHostChatList, setMyHostChatList] = useState<Chat[]>([]);
  const [myChatList, setMyChatList] = useState<Chat[]>([]);
  const getMyChat = async () => {
    const myChats = (await chatListAPI.getMyChatList()).data.chats;
    const sortedMyChatList = sortChatList(myChats);

    setMyHostChatList(filterPrivateChat(sortedMyChatList, true));
    setMyChatList(filterPrivateChat(sortedMyChatList, false));
  };
  useEffect(() => {
    getMyChat();
    const timer = setInterval(() => {
      getMyChat();
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.headerWrapContainer}>
      <Header pageName="나의 채팅" />
      <div className={styles.list_container}>
        <div className={styles.titleContainer}>
          <p>숙소와 채팅</p>
          <IoIosChatbubbles />
        </div>
        <ul>
          {myHostChatList.map(chat => (
            <MyChatListItem key={chat.id} chat={chat} />
          ))}
        </ul>
        <div className={styles.titleContainer}>
          <p>유저와 채팅</p>
          <IoIosChatbubbles />
        </div>
        <ul>
          {myChatList.map(chat => (
            <MyChatListItem key={chat.id} chat={chat} />
          ))}
        </ul>
      </div>
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
