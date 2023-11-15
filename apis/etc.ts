import { removeStorage } from '@/utils/loginStorage';

// 로그아웃
export const logout = async () => {
  removeStorage('accessToken');
  removeStorage('refreshToken');
};
