import instance from './axios';

const chatListAPI = {
  // 모든 채팅 조회
  getAllChatList() {
    return instance.get('/chat/all');
  },
  // 나의 채팅 조회
  getMyChatList() {
    return instance.get('/chat');
  },
  // 채팅 참여
  participateChat(chatId: string) {
    return instance.patch('/chat/participate', { chatId });
  },
};

export default chatListAPI;
