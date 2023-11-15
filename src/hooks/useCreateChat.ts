import React, { useCallback } from 'react';
import toast from 'react-hot-toast';

const useCreateChat = (
  accessToken: string | null,
  chatName: string,
  selectedUserId: string,
) => {
  const createChat = useCallback(async () => {
    try {
      const response = await fetch('https://fastcampus-chat.net/chat', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          serverId: `${process.env.REACT_APP_SERVER_ID}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: chatName,
          users: [selectedUserId],
          isPrivate: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);

      return {};
    }
  }, [accessToken, chatName, selectedUserId]);

  return createChat;
};

export default useCreateChat;
