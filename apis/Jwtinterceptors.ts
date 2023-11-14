import {
  getStorage,
  isLoginStorage,
  removeStorage,
  setStorage,
} from '@/utils/loginStorage';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { logout } from './etc';

const Jwtinterceptors = () => {
  const instance = axios.create({
    baseURL: 'https://fastcampus-chat.net',
    // 여기에 공통 설정을 추가할 수 있습니다.
    headers: {
      'Content-Type': 'application/json',
      serverId: process.env.NEXT_PUBLIC_API_KEY,
    },
  });

  instance.interceptors.request.use(
    async config => {
      const accessToken = getStorage('accessToken');
      if (accessToken) {
        const tokenValid = await isAccessTokenValid(accessToken);
        const isLogin = isLoginStorage();
        if (isLogin && !tokenValid) {
          try {
            const result = await refreshingToken(accessToken);
            if (!result) {
              alert('로그인 시간이 만료되었습니다\n다시 로그인 해주세요');
              await logout();
              return Promise.reject('로그인 시간 만료');
            }
            config.headers[
              'Authorization'
            ] = `Bearer ${result?.data.accessToken}`;
          } catch (error) {
            console.error('Error refreshing token:', error);
            return Promise.reject(error);
          }
        } else {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
      }
      return config;
    },
    function (error) {
      alert('해당 요청이 정상적으로 이루어지지 않았어요.\n 다시 시도해주세요.');
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response: AxiosResponse) {
      if (response.headers.Authorization) {
        const newAccessToken = response?.headers?.Authorization;
        removeStorage('accessToken');
        setStorage('accessToken', newAccessToken);
        response.headers.Authorization = `${newAccessToken}`;
      }
      return response;
    },
    async error => {
      return Promise.reject(error);
    },
  );

  //액세스토큰 유효성 검사
  const isAccessTokenValid = async (accessToken: string | undefined) => {
    try {
      if (!accessToken) return false;
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
      const response = await instance.post('/refresh', refreshToken);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.message);
    }
  };

  //토큰 리프레시
  const refreshingToken = async (accessToken: string) => {
    const refreshToken = getStorage('refeshToken');
    if (refreshToken) {
      try {
        if (!accessToken || !refreshToken) {
          // token이 null이거나 refreshToken이 없는 경우
          throw new Error('Token or refreshToken is null');
        }

        const newAccessToken = await refresh(refreshToken);
        setStorage('accessToken', newAccessToken?.data);

        return newAccessToken?.data;
      } catch (error) {
        console.error('refreshToken ERROR', error);
      }
    }
  };
  return { instance };
};

export default Jwtinterceptors;
