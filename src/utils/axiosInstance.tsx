import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://fastcampus-chat.net',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkMDIyNjA3OnVzZXJJZCIsImlhdCI6MTY5OTM3MTE3MywiZXhwIjoxNjk5OTc1OTczfQ.SIvnz9dFVW6qODtES_NbUSZQ9LCULFaFSLNrNZ9N6hk',
    serverId: `${process.env.REACT_APP_SERVER_ID}`,
  },
});

export default axiosInstance;
