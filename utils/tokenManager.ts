import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export function setToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN', token: string) {
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  cookies.set(key, token, {
    path: '/',
    expires: key === 'ACCESS_TOKEN' ? expires : undefined,
  });
}

export function removeToken(key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') {
  cookies.remove(key, { path: '/' });
}

export function removeTokenAll() {
  removeToken('ACCESS_TOKEN');
  removeToken('REFRESH_TOKEN');
}

export function getAccessToken() {
  return cookies.get('ACCESS_TOKEN');
}

export function getRefreshToken() {
  return cookies.get('REFRESH_TOKEN');
}
