import axios from 'axios';
import { postRefreshToken } from './refreshToken';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-Type': 'application/json',
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = window.localStorage.getItem('accessToken');
    console.log(accessToken);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const response = await postRefreshToken();

      if (response) {
        window.localStorage.setItem('accessToken', response.accessToken);
        window.localStorage.setItem('refreshToken', response.refreshToken);
        error.config.headers[
          'Authorization'
        ] = `Bearer ${response.accessToken}`;
        const originalResponse = await axios.request(error.config);
        return originalResponse;
      } else {
        window.localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
