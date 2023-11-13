import axios from 'axios';
import { setToken } from './token';
import { refreshToken } from './token';

export const instance = axios.create({
    baseURL: 'https://fastcampus-chat.net/',
});

instance.interceptors.request.use((config) => {
    const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;

    if (accessToken) {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        config.headers['serverId'] = `${process.env.NEXT_PUBLIC_SERVER_KEY}`;
    } else {
        config.headers['Content-Type'] = 'application/json';
        config.headers['serverId'] = `${process.env.NEXT_PUBLIC_SERVER_KEY}`;
    }

    return config;
});

instance.interceptors.response.use((res) => {
    if (200 <= res.status && res.status < 300) {
        if (res.data.message === 'User created') {
            return res.data;
        } else {
            setToken(res.data);
            return res.data;
        }
    }
    if (res.status === 401) {
        refreshToken();
    }
    return Promise.reject(res.data);
});
