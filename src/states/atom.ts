import { atom } from 'recoil';

export const allUserState = atom<any[]>({
  key: 'allUserState',
  default: [],
});

export const allRoomState = atom<any[]>({
  key: 'allRoomsState',
  default: [],
});

export const onlineUserState = atom<any>({
  key: 'onlineUserState',
  default: null,
});
