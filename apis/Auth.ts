import instance from './axios';

interface UserLogin {
  id: string;
  password: string;
}

interface UserLoginResponse {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
}

const Auth = () => {
  // 로그인 (로그인유지)
  const login = async (userLogin: UserLogin) => {
    try {
      const response: UserLoginResponse = await instance.post(
        '/login',
        userLogin,
      );
    } catch (error) {
      console.log(error);
    }
  };
  return { login };
};

export default Auth;
