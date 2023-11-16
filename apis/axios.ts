import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fastcampus-chat.net',
  headers: {
    'Content-Type': 'application/json',
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default instance;
