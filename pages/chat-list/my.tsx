import { useState, useEffect } from 'react';
import { Chat } from '@/@types/types';
import { sortChatList, filterPrivateChat } from '@/utils/chatList';  
import chatListAPI from '../../apis/chatListAPI';
import styles from './ChatList.module.scss';
import MyChatListItem from '@/components/ChatList/MyChatListItem';


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
  }, []);



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
