/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ChatCard from './ChatCard';
import { ChatType } from '../../types/ChatType';
import { ChatsWrapper } from '../../styles/chat/ChatListStyles';

function Chats({ chatList }: any) {
  return (
    <ChatsWrapper>
      {chatList.map((chat: any, index: any) => (
        <ChatCard chat={chat} key={index} />
      ))}
    </ChatsWrapper>
  );
}

export default Chats;
