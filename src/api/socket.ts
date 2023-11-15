import { io } from 'socket.io-client';

const getSocket = (chatId: string) => {
  const socket = io(`${process.env.REACT_APP_API_URL}/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
      serverId: `${process.env.REACT_APP_SERVER_ID}`,
    },
  });
  return socket;
};
export default getSocket;
