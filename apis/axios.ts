import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default instance;
