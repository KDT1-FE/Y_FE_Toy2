import axios, { AxiosError } from 'axios';
import { setToken } from './tokenManager';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// eslint-disable-next-line consistent-return
export default async function authorizeFetch({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const headers = {
    'Content-Type': 'application/json',
    serverId: process.env.NEXT_PUBLIC_API_KEY,
    withCredentials: true,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
  };

  try {
    const { data } = await instance.get('/auth/me', {
      headers,
    });
    return { data, isAuth: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response && error.response.status === 400) {
        try {
          const { data: newTokenData } = await instance.post('/refresh', {
            refreshToken,
          });

          const newAccessToken = newTokenData.data.accessToken;
          setToken('ACCESS_TOKEN', newAccessToken);

          const { data } = await instance.post('/auth/me', {
            headers: {
              'Content-Type': 'application/json',
              serverId: process.env.NEXT_PUBLIC_API_KEY,
              withCredentials: true,
              Authorizaiton: `Bearer ${newAccessToken}`,
            },
          });

          return { data, isAuth: true };
        } catch (e) {
          console.log(e);
          return { isAuth: false };
        }
      }
    }
    return { isAuth: false };
  }
}
