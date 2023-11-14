import Jwtinterceptors from './Jwtinterceptors';

interface ICreateChatRequestBody {
  name: string; // chat 이름
  users: string[]; // 참가자들 id(자신 미포함)
  isPrivate?: boolean; // 공개 비공개
}

const { instance } = Jwtinterceptors();

const chatListAPI = {
  // 모든 채팅 조회
  getAllChatList() {
    return instance.get('/chat/all');
  },
  // 나의 채팅 조회
  getMyChatList() {
    return instance.get('/chat');
  },
  // 채팅방 생성
  createChat(data: ICreateChatRequestBody) {
    return instance.post('/chat', data);
  },
  // 채팅 참여
  participateChat(chatId: string) {
    return instance.patch('/chat/participate', { chatId });
  },
};

export default chatListAPI;
