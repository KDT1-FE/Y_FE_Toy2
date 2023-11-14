import instance from '@/apis/axios';
import { cookies } from 'next/headers';
import { ClientRefresh, UserLoginResponse } from '@/@types/user';

interface LoginRequestBody {
  id: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호 (필수!)
}

export const login = async ({ id, password }: LoginRequestBody) => {
  const { data } = await instance.post<UserLoginResponse>('/login', {
    id,
    password,
  });

  return data;
};

export const refresh = async () => {
  const refreshToken = cookies().get('refreshToken');
  if (refreshToken) {
    const { data } = await instance.post<ClientRefresh>('/refresh', {
      refreshToken: refreshToken.value,
    });

    return data.accessToken;
  }
  throw Error('refreshToken이 없어요');
};
