import Jwtinterceptors from './Jwtinterceptors';

const { instance } = Jwtinterceptors();

const userListAPI = {
  // 모든 유저 조회
  getAllUserList() {
    return instance.get('/users');
  },
};

export default userListAPI;
