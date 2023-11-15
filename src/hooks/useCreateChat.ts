import React, { useCallback } from 'react';

const useCreateChat = (
  accessToken: string | null,
  chatName: string,
  selectedUserId: string,
) => {
  const createChat = useCallback(async () => {
    const response = await fetch('https://fastcampus-chat.net/chat', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: chatName,
        users: [selectedUserId],
        isPrivate: false,
      }),
    });

    const data = response.json();
    return data;
  }, [accessToken, chatName, selectedUserId]);

  return createChat;
};

export default useCreateChat;
