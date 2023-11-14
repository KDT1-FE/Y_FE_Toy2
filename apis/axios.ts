import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fastcampus-chat.net',
  // 여기에 공통 설정을 추가할 수 있습니다.
  headers: {
    'Content-Type': 'application/json',
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default instance;
