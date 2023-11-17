import { io } from 'socket.io-client';

const getSocket = (chatId: string) => {
  const socket = io(`wss://fastcampus-chat.net/chat?chatId=${chatId}`, {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      serverId: `${process.env.REACT_APP_SERVER_ID}`,
    },
  });
  return socket;
};
export default getSocket;
