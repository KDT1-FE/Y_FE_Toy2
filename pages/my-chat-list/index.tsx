import { useState, useEffect } from 'react';
import Link from 'next/link';
import chatListAPI from '../../apis/chatListAPI';

export default function MyChatList() {
  const [myChatList, setMyChatList] = useState([]);
  const getMyChat = async () => {
    const ChatMyList = await chatListAPI.getMyChatList();
    setMyChatList(ChatMyList.data.chats);
  };
  useEffect(() => {
    getMyChat();
  }, []);
  return (
    <>
      {myChatList.map(chat => (
        <Link href={`/chat/${chat.id}`} key={chat.id}>
          <div>{chat.name}</div>
        </Link>
      ))}
    </>
  );
}
