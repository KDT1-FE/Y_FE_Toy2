import React from 'react';

import ChatCard from './ChatCard';
import { ChatType } from '../../types/ChatType';
import { ChatsWrapper } from '../../styles/chat/ChatListStyles';
import SkeletonChatCard from './SkeletonChatCard';

interface IChatsProps {
  chatList: ChatType[];
}

function Chats({ chatList }: IChatsProps) {
  return (
    <ChatsWrapper>
      {chatList.length !== 0
        ? chatList.map((chat: ChatType, index: React.Key) => (
            <ChatCard chat={chat} key={index} />
          ))
        : new Array(8)
            .fill(0)
            .map((_, index: React.Key) => <SkeletonChatCard key={index} />)}
    </ChatsWrapper>
  );
}

export default Chats;
