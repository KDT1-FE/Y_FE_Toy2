import { useQuery } from '@tanstack/react-query';
import { Channel } from '../@types/channel';
import { getChannels } from '../api/channel';
import { ALL_CHANNELS } from '../constants/channel';

const useChannels = () => {
  return useQuery<Channel[]>({
    queryKey: ALL_CHANNELS,
    queryFn: getChannels,
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useChannels;
