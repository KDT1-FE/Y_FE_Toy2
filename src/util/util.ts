import { NavigateFunction } from 'react-router';
import { getAllUsers, leaveGameRoom, postRefresh, getUserData } from '../api';
import { disconnectChattingSocket } from '../api/socket';

export const setCookises = async (
  accessToken: string,
  refreshToken: string,
) => {
  try {
    document.cookie = `accessToken=${accessToken};max-age=3600;path=/;secure`;
    document.cookie = `refreshToken=${refreshToken};max-age=604800;path=/;secure`;
    alert('쿠키설정에 성공했습니다.');
  } catch (e) {
    console.error(e);
    alert('쿠키설정에 실패했습니다.');
  }
};

export function getCookie(name: string): string | undefined {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];

  console.log(cookieValue);

  return cookieValue || undefined;
}

export const getAllUsersData = async () => {
  try {
    const res = await getAllUsers();
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);

    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const getMyUserData = async (userId: string) => {
  try {
    const res = await getUserData(userId);
    console.log(res);
    return res;
  } catch (e) {
    console.error(e);
    alert('사용자 정보를 가져오는데 실패했습니다.');
  }
};

export const postRefreshToken = async () => {
  try {
    const res = await postRefresh();
    console.log(res.data);
    alert('토큰 재발급에 성공했습니다.');
  } catch (e) {
    console.error(e);
    alert('토큰 재발급에 실패했습니다.');
  }
};

export const titleAction = async (navigate: NavigateFunction, id: string) => {
  const url = window.location.pathname;
  if (url === '/' || url === '/account' || url === '/join') {
    navigate('/');
  } else if (url === '/lobby') {
    navigate('/lobby');
  } else {
    try {
      await leaveGameRoom(id);
    } catch (error) {
      console.log(error);
    } finally {
      disconnectChattingSocket();
      navigate('/lobby');
    }
  }
};
