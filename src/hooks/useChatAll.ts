import React, { useCallback, useState, useEffect } from 'react';

const useChatAll = (accessToken: string | null) => {
  const [chatList, setChatList] = useState([]);

  const chatAll = async () => {
    const response = await fetch('https://fastcampus-chat.net/chat', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    setChatList(data.chats);
  };

  useEffect(() => {
    chatAll();
  }, []);

  return chatList;
};

export default useChatAll;
