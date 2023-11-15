import { ClientRefresh } from '@/@types/user';
import { getStorage, setStorage } from '@/utils/loginStorage';
import axios, { AxiosError } from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { logout } from './etc';

const Jwtinterceptors = () => {
  const instance = axios.create({
    baseURL: 'https://fastcampus-chat.net',
    headers: {
      'Content-Type': 'application/json',
      serverId: process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  // 액세스토큰 유효성 검사
  const isAccessTokenValid = async (accessToken: string) => {
    try {
      const tokenInfo = jwtDecode<JwtPayload>(accessToken);
      if (tokenInfo.exp && tokenInfo.exp <= Date.now() / 1000) return false;
      return true;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  };

  // 리프레시
  const refresh = async (refreshToken: string | undefined) => {
    try {
      if (refreshToken) {
        const { data } = await instance.post<ClientRefresh>(
          '/refresh',
          refreshToken,
        );
        return data.accessToken;
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
    throw Error('refreshToken이 없어용');
  };

  instance.interceptors.request.use(async config => {
    const accessToken = getStorage('accessToken');
    if (!accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = null;
      return config;
    }

    if (accessToken) {
      const tokenValid = await isAccessTokenValid(accessToken);

      if (!tokenValid) {
        const refreshToken = getStorage('refeshToken');
        if (refreshToken) {
          try {
            const newAccessToken = await refresh(refreshToken);
            setStorage('accessToken', newAccessToken);
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            return config;
          } catch (error) {
            //
          }
        } else {
          alert('로그인을 다시 시도해주세요.');
          await logout();
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
    } else {
      throw Error('AccessToken이 존재하지않습니다');
    }
    return config;
  });

  return { instance };
};

export default Jwtinterceptors;
