import { io } from 'socket.io-client';

const chatId = '0ad59c7d-e1b1-42ab-bb64-8bb6344dc0d6';

const socket = io(`${process.env.REACT_APP_API_URL}/chat?chatId=${chatId}`, {
  extraHeaders: {
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default socket;
