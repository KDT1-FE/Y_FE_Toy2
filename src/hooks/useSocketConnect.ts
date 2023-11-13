import React, { useCallback, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const useSocketConnect = (chatId: string, accessToken: string | null) => {
  const [socketState, setSocketState] = useState<Socket | null>(null);

  const socketConnect = useCallback(async () => {
    const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
      extraHeaders: {
        serverId: '9b9a6496',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setSocketState(socket);
  }, [chatId, accessToken]);

  useEffect(() => {
    socketConnect();
  }, [socketConnect]);

  return socketState;
};
export default useSocketConnect;
