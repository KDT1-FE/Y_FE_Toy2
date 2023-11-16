import { useState, useEffect } from 'react';
import { Chat } from '@/@types/types';
import { sortChatList, filterPrivateChat } from '@/utils/chatList';
import MyChatListItem from '@/components/ChatList/MyChatListItem';
import Header from '@/components/Common/Header/Header';
import { IoIosChatbubbles } from 'react-icons/io';
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';

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
