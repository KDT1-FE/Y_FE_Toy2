import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    serverId: process.env.NEXT_PUBLIC_API_KEY,
  },
});

instance.interceptors.request.use(config => {
  if (!config.headers.Authorization) return config;
});

instance.interceptors.response.use(response => {
  return console.log(response);
});

export default instance;
