import { useQuery } from '@tanstack/react-query';
import { Channel } from '../@types/chat';
import { getChannels } from '../api/channel';
import { ALL_CHANNELS } from '../constants/channel';

const useChannels = () => {
  return useQuery<Channel[]>({
    queryKey: ALL_CHANNELS,
    queryFn: getChannels,
  });
};

export default useChannels;
