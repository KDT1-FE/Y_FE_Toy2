import Jwtinterceptor from './JwtInterceptor';

const { instance } = Jwtinterceptor();

const userAPI = {
  // 엑세스토큰 유효성 검사
  getTokenValid() {
    return instance.get('/auth/me');
  },
};

export default userAPI;
