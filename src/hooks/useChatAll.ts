import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useChatAll = (accessToken: string | null) => {
  const [chatList, setChatList] = useState([]);

  const chatAll = async () => {
    try {
      const response = await fetch('https://fastcampus-chat.net/chat', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          serverId: '9b9a6496',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setChatList(data.chats);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  useEffect(() => {
    chatAll();
  }, []);

  return chatList;
};

export default useChatAll;
