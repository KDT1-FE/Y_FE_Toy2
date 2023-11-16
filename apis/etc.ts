import { deleteCookie } from 'cookies-next';

// 로그아웃
const logout = async () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  window.location.href = '/login';
};

export default logout;
