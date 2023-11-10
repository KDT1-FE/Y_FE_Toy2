import axios from 'axios';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNiN2ZiMTExZTp1c2VyMyIsImlhdCI6MTY5OTUzMzExMiwiZXhwIjoxNzAwMTM3OTEyfQ.4eslctzcBGQAwkcKT97IbF0i-9-MZ0kvhjY4A6sK8Wo';

const instance = axios.create({
  baseURL: 'https://fastcampus-chat.net',
  // 여기에 공통 설정을 추가할 수 있습니다.
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

export default instance;
