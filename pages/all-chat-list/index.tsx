import { useState, useEffect } from 'react';
import Link from 'next/link';
import chatListAPI from '../../apis/chatListAPI';

export default function AllChatList() {
  const [allChatList, setAllChatList] = useState([]);
  const getAllChat = async () => {
    const chatAllList = await chatListAPI.getAllChatList();
    setAllChatList(chatAllList.data.chats);
  };
  useEffect(() => {
    getAllChat();
  }, []);
  return (
    <>
      {allChatList.map(chat => (
        <Link href={`/chat/${chat.id}`} key={chat.id}>
          <div>{chat.name}</div>
        </Link>
      ))}
    </>
  );
}
