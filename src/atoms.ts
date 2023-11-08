/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { FbUser } from './types/User';

export const accessTokenState = atom({
  key: 'accessTokenState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('accessToken'), // default value (aka initial value)
});

const defaultSignUpValue: FbUser = {
  id: '',
  password: '',
  name: '',
  picture: '',
  intro: '',
  language: '',
  level: '',
  hashtag: [],
};

export const signUpFormState = atom({
  key: 'signUpFormState',
  default: defaultSignUpValue,
});
