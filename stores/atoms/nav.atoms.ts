import { atom } from 'recoil';

const showNavigationState = atom<boolean>({
  key: 'showNavigationState',
  default: true,
});

export default showNavigationState;
