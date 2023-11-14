import { UserLogin } from '@/@types/user';
import { userIdState } from '@/recoil/atoms/userIdState';
import { setStorage } from '@/utils/loginStorage';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import Jwtinterceptors from './Jwtinterceptors';

const Auth = () => {
  const { instance } = Jwtinterceptors();
  const router = useRouter();
  const setUserId = useSetRecoilState(userIdState);

  // 로그인 (로그인유지)
  const login = async (userLogin: UserLogin) => {
    try {
      const response = await instance.post('/login', userLogin);
      setStorage('accessToken', response.data.accessToken);
      setStorage('refreshToken', response.data.refreshToken);
      setStorage('isLogin', 'true');
      setUserId(userLogin.id);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return { login };
};

export default Auth;
