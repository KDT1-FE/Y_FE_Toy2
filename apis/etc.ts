import { removeStorage } from '@/utils/loginStorage';
import { useRouter } from 'next/router';

// 로그아웃
export const logout = async () => {
  const router = useRouter();
  removeStorage('accessToken');
  removeStorage('refreshToken');
  router.push('/');
};
