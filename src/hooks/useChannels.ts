import { useQuery } from '@tanstack/react-query';
import { Channel } from '../@types/channel';
import { getMyChannels } from '../api/channel';
import { ALL_CHANNELS } from '../constants/channel';

const useChannels = () => {
  return useQuery<Channel[]>({
    queryKey: ALL_CHANNELS,
    queryFn: getMyChannels,
  });
};

export default useChannels;
