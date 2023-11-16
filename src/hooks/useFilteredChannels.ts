import { useDeferredValue } from 'react';
import { useRecoilValue } from 'recoil';
import {
  modalChannelState,
  categoryChannelState,
} from '../recoil/channel.atom';
import { filterChannels } from '../utils';
import { Channel } from '../@types/channel';

const useFilteredChannels = (channels: Channel[]) => {
  const channel = useRecoilValue(modalChannelState);
  const selectedCategory = useRecoilValue(categoryChannelState);

  const deferredTitle = useDeferredValue(channel.title);

  return channels
    ? filterChannels(deferredTitle, selectedCategory.category, channels)
    : [];
};

export default useFilteredChannels;
