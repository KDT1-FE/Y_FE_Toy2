import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

export default instance;
