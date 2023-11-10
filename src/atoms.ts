import { atom } from 'recoil';
import { FbUser } from './types/User';

export const accessTokenState = atom({
  key: 'accessTokenState', // unique ID (with respect to other atoms/selectors)
  default: localStorage.getItem('accessToken'), // default value (aka initial value)
});

export const defaultSignUpValue: FbUser = {
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

export const userState = atom<string>({
  key: 'userState',
  default: localStorage.getItem('user') ?? '{}',
});

export const uploadFileState = atom<File | null>({
  key: 'uploadFileState',
  default: null,
});
