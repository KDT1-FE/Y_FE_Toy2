import instance from './axios';

const chatListAPI = {
  // 로그인
  getAllChatList() {
    return instance.get('/chat/all');
  },
  // 회원가입
  getMyChatList() {
    return instance.get('/chat');
  },
};

export default chatListAPI;
