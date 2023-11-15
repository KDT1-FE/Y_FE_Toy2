import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Chat } from '@/@types/types';
import Image from 'next/image';
import { formattingTime, todayDate } from '@/utils/formattedTimeData';
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';
import MyChatListItem from '@/components/ChatList/MyChatListItem';


export default function MyChatList() {
  const [myHostChatList, setMyHostChatList] = useState<Chat[]>([]);
  const [myChatList, setMyChatList] = useState<Chat[]>([]);
  const getMyChat = async () => {
    const chatMyList = await chatListAPI.getMyChatList();
    setMyChatList(chatMyList.data.chats);
    setMyHostChatList(
      chatMyList.data.chats.filter((chat: Chat) => chat.isPrivate),
    );
    setMyChatList(
      chatMyList.data.chats.filter((chat: Chat) => !chat.isPrivate),
    );
  };
  useEffect(() => {
    getMyChat();
  }, []);

  const today = new Date();
  const isToday = today.toISOString().split('T')[0];


          


  return (
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
  )};