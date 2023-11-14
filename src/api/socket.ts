import { io } from 'socket.io-client';

const chatId = '98cc00f9-3e94-4b91-888a-85e9d1d82c20';

const socket = io(`${process.env.REACT_APP_API_URL}/chat?chatId=${chatId}`, {
  extraHeaders: {
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default socket;
