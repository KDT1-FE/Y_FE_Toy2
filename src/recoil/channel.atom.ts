import { atom } from 'recoil';

export interface ChannelState {
  title: string;
  category: string;
}

export const modalChannelState = atom<ChannelState>({
  key: 'modalChannelState',
  default: {
    title: '',
    category: '',
  },
});

export const categoryChannelState = atom<ChannelState>({
  key: 'categoryChannelState',
  default: {
    title: '',
    category: '',
  },
});
