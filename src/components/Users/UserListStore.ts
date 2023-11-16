import { atom } from 'recoil';

interface ConnectUserIdListIF {
  users: string[];
}

export const ConnectUserIdList = atom<ConnectUserIdListIF>({
  key: 'connectUserIdList',
  default: { users: [] },
});