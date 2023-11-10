import axios from 'axios';
import { API_BASED_URL } from './apiUrl';

const instance = axios.create({
  baseURL: `${API_BASED_URL}`,
  headers: {
    'content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_USER_TOKEN || ''}`,
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

export default instance;
