import { userIdState } from '@/recoil/atoms/userIdState';
import { removeStorage } from '@/utils/loginStorage';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';

// 로그아웃
export const logout = async () => {
  const setUserId = useSetRecoilState(userIdState);
  const router = useRouter();
  removeStorage('accessToken');
  removeStorage('refreshToken');
  setUserId(null);
  router.push('/');
};
