/* eslint-disable consistent-return */
import { getAccessToken } from '@/utils/tokenManager';
import axios from 'axios';

const Jwtinterceptor = () => {
  const accessToken = getAccessToken();
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      serverId: process.env.NEXT_PUBLIC_API_KEY,
      withCredentials: true,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { instance };
};

export default Jwtinterceptor;
