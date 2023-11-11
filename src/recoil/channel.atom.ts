import { atom } from 'recoil';

export interface ChannelState {
  title: string;
  category: string;
}

export const channelState = atom<ChannelState>({
  key: 'channelState',
  default: {
    title: '',
    category: '기타',
  },
});
