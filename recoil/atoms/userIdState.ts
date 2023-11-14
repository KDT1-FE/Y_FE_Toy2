import { atom } from 'recoil';

export const userIdState = atom<string | null>({
  key: 'userIdState',
  default: 'null',
});
