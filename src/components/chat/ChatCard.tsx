import React from 'react';
import { Link } from 'react-router-dom';
import { ChatType } from '../../types/ChatType';

interface IChatProps {
  chat: ChatType;
}

function Chat({ chat }: IChatProps) {
  return (
    <Link to={`/chat/${chat.id}`}>
      <div>
        <span>{chat.name}</span>
      </div>
    </Link>
  );
}

export default Chat;
