import instance from './axios';

export async function postRefreshToken() {
  try {
    const refreshToken = window.localStorage.getItem('refreshToken');
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'refresh-token': refreshToken,
    };

    const { data } = await instance.post(
      '/https://fastcampus-chat.net/refresh',
      {},
      {
        headers: headers,
      },
    );

    if (data.flag === 'success') {
      return data.data[0];
    } else if (data.flag === 'fail') {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
