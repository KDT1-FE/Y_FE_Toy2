import axios from 'axios';
import { getCookie, setLoginCookie } from './cookie';
import { refreshCookie } from './cookie';

export const instance = axios.create({
  baseURL: 'https://fastcampus-chat.net/',
  headers: {
    'Content-Type': 'application/json',
    serverId: `${process.env.NEXT_PUBLIC_SERVER_KEY}`,
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use((res) => {
  if (200 <= res.status && res.status < 300) {
    if (res.data.message === 'User created') {
      return res.data;
    } else {
      setLoginCookie(res.data);
      return res.data;
    }
  }
  if (res.status === 401) {
    refreshCookie();
  }
  return Promise.reject(res.data);
});
