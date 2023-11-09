import { io } from 'socket.io-client';
import { BASE_URL } from '../constants/url';

const chatId = '8cb0702a-4bd8-42a9-968e-18df8e5f0665';

const socket = io(`${BASE_URL}/chat?chatId=${chatId}`, {
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});
export default socket;
