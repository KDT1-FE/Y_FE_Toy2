import axios, { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

export const instance = axios.create({
    baseURL: 'https://fastcampus-chat.net/',
});

// any 임시 처리
function requestInterceptor(config: AxiosRequestConfig): any {
    const accessToken = sessionStorage.getItem('accessToken');

    if (accessToken) {
        return {
            ...config,
            headers: {
                'content-type': 'application/json',
                serverId: `${process.env.API_SERVER_KEY}`,
                Authorization: `Bearer ${accessToken}`,
            },
        };
    } else {
        return {
            ...config,
            headers: {
                'content-type': 'application/json',
                serverId: `${process.env.API_SERVER_KEY}`,
            },
        };
    }
}

instance.interceptors.request.use(requestInterceptor);

function responseFulfilledInterceptor(res: AxiosResponse) {
    if (200 <= res.status && res.status < 300) {
        if (res.data.message === 'User created') {
            return res.data;
        } else {
            const { accessToken } = res.data;
            const existingToken = sessionStorage.getItem('accessToken');
            if (!existingToken) {
                sessionStorage.setItem('accessToken', accessToken);
            }
            return res.data;
        }
    }
    return Promise.reject(res.data);
}

function responseRejectedInterceptor(error: AxiosError) {
    return error;
}

instance.interceptors.response.use(responseFulfilledInterceptor, responseRejectedInterceptor);
