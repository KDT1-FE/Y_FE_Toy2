import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

const useSocketConnect = (
  chatId: string | undefined,
  accessToken: string | null,
) => {
  const socket = useMemo(
    () =>
      io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
        extraHeaders: {
          serverId: '9b9a6496',
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    [],
  );

  useEffect(
    () => () => {
      socket.disconnect();
    },
    [],
  );

  return socket;
};
export default useSocketConnect;
