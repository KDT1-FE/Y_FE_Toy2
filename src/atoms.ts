/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';

export const accessTokenState = atom({
  key: 'accessTokenState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('accessToken'), // default value (aka initial value)
});
