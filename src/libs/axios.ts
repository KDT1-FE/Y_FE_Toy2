import axios from 'axios';

export const publicApi = axios.create({
  baseURL: 'https://fastcampus-chat.net/',
  headers: {
    'content-type': 'application/json',
    serverId: '9b9a6496',
  },
});

export const privateApi = axios.create({
  baseURL: 'https://fastcampus-chat.net/',
  headers: {
    'content-type': 'application/json',
    serverId: '9b9a6496',
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

// 토큰을 함께보내는 privateApi에 interceptor를 적용합니다
privateApi.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => response,
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    const originalConfig = error.config;
    // const msg = error.response.data.message;
    const { status } = error.response;

    if (status === 401) {
      // if (msg === 'access token expired') {
      await axios({
        url: `https://fastcampus-chat.net/refresh`,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          serverId: '9b9a6496',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        data: {
          refreshToken: localStorage.getItem('refreshToken'),
        },
      }).then((res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        originalConfig.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return publicApi(originalConfig);
      });
      // }
    } else if (status === 400 || status === 404 || status === 409) {
      // window.alert(msg);
    }
    return Promise.reject(error);
  },
);
