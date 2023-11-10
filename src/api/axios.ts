import axios from 'axios';
import { BASE_URL } from '../constants/url';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

export default instance;
