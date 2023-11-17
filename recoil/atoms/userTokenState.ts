/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import authorizeFetch from '@/utils/authorizeFetch';
import {
  getAccessToken,
  getRefreshToken,
  removeTokenAll,
} from '@/utils/tokenManager';
import { atom } from 'recoil';

const SIGNOUT_USER_STATE = {
  id: null,
  name: null,
  picture: null,
  isLoggedIn: false,
};

const cookieEffect =
  (accessTokenkey: 'ACCESS_TOKEN', refreshTokenKey: 'REFRESH_TOKEN') =>
  ({ setSelf, onSet }: any) => {
    onSet(async () => {
      try {
        const accessToken: string = getAccessToken();
        const refreshToken: string = getRefreshToken();

        if (!accessToken || !refreshToken) {
          removeTokenAll();
          return SIGNOUT_USER_STATE;
        }

        const { data } = await authorizeFetch({
          accessToken,
          refreshToken,
        });

        const { auth } = data;
        const { id, name, picture } = data.user;
        return { id, name, picture, auth, isLoggedIn: true };
      } catch (error: unknown) {
        removeTokenAll();
        console.log(error);
        return SIGNOUT_USER_STATE;
      }
    });
  };

const userTokenState = atom({
  key: `user/${new Date().getUTCMilliseconds() * Math.random()}`,
  effects: [cookieEffect('ACCESS_TOKEN', 'REFRESH_TOKEN')],
  default: SIGNOUT_USER_STATE,
});

export default userTokenState;
