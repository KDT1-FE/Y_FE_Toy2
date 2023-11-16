import { atom } from 'recoil';

interface ConnectUserIdList {
  users: string[];
}

export const ConnectUserIdList = atom<ConnectUserIdList>({
  key: 'connectUserIdList',
  default: { users: [] },
});