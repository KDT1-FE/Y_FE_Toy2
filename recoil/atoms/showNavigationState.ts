import { atom } from 'recoil';

export const showNavigationState = atom<boolean>({
  key: 'showNavigationState',
  default: true,
});
