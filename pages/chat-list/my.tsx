import { useState, useEffect } from 'react';
import { Chat } from '@/@types/types';
import { sortChatList, filterPrivateChat } from '@/utils/chatList';
import MyChatListItem from '@/components/ChatList/MyChatListItem';
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';
import MyChatListItem from '@/components/ChatList/MyChatListItem';
import Header from '@/components/Header/Header';

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
    <div className={styles.allContainer}>
      <Header pageName="My"/>
      <div className={styles.list_container}>
        <div>숙소와 채팅</div>
        <ul>
          {myHostChatList.map(chat => {
            return (
             <MyChatListItem chat={chat}/>
            )})}
        </ul>
        <div>유저와 채팅</div>
        <ul>
          {myChatList.map(chat => {
          return (
            <MyChatListItem chat={chat}/>
          );
        })}
        </ul>
      </div>

    </div>
    
  )};

