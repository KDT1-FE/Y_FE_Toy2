import { atom } from 'recoil';

export const allUserState = atom<any[]>({
  key: 'allUserState',
  default: [],
});
