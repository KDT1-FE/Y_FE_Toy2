import Jwtinterceptors from './Jwtinterceptors';

const { instance } = Jwtinterceptors();

const chatAPI = {
  // 특정 채팅방 정보조회
  getChatInfo(chatId: string) {
    return instance.get(`/only?chatId=${chatId}`);
  },
  // 특정 유저 조회
  getUserInfo(userId: string) {
    return instance.get(`/user?userId=${userId}`);
  },
};

export default chatAPI;
