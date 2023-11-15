import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

const useSocketConnect = (
  chatId: string | undefined,
  accessToken: string | null,
) => {
  // const [socketState, setSocketState] = useState<Socket | null>(null);

  // const socketConnect = async () => {
  //   const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
  //     extraHeaders: {
  //       serverId: '9b9a6496',
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });

  //   setSocketState(socket);
  // };

  // useEffect(() => {
  //   socketConnect();
  // }, []);

  // return socketState;

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
    () =>
      // setSocketState(socket);
      () => {
        socket.disconnect();
      },
    [],
  );

  return socket;
};
export default useSocketConnect;
