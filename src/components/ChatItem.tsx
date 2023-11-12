import React from 'react';
import { Chat } from '../types/ChatType';

const ChatItem: React.FC<Chat> = ({ user, text }) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <img style={{ width: '50px', height: '50px' }} src={user.imageUrl} />
        <p>{user.nickname}</p>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default ChatItem;
