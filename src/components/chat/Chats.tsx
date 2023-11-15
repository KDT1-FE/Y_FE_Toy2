import React from 'react';
import ChatCard from './ChatCard';
import { ChatType } from '../../types/ChatType';
import { ChatsWrapper } from '../../styles/chat/ChatListStyles';

interface IChatsProps {
  chatList: ChatType[];
}

function Chats({ chatList }: IChatsProps) {
  return (
    <ChatsWrapper>
      {chatList.map((chat: ChatType, index: React.Key) => (
        <ChatCard chat={chat} key={index} />
      ))}
    </ChatsWrapper>
  );
}

export default Chats;
