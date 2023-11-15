import { UserLogin } from '@/@types/user';
import { userIdState } from '@/recoil/atoms/userIdState';
import { setStorage } from '@/utils/loginStorage';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import Jwtinterceptors from './JwtInterceptor';

const Auth = () => {
  const { instance } = Jwtinterceptors();
  const router = useRouter();
  const setUserId = useSetRecoilState(userIdState);

  // 로그인 (로그인유지)
  const login = async (userLogin: UserLogin) => {
    try {
      const { data } = await instance.post('/login', userLogin);
      setStorage('accessToken', data.accessToken);
      setStorage('refreshToken', data.refreshToken);
      setUserId(userLogin.id);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
};

export default Auth;
