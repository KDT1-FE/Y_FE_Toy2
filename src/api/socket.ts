import { io } from 'socket.io-client';

const chatId = '8cb0702a-4bd8-42a9-968e-18df8e5f0665';

const socket = io(`${process.env.REACT_APP_API_URL}/chat?chatId=${chatId}`, {
  extraHeaders: {
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default socket;
