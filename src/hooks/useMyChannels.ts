import { useQuery } from '@tanstack/react-query';
import { getMyChannels } from '../api/channel';
import { Channel } from '../@types/channel';
import { MY_CHANNELS } from '../constants/channel';

export const useMyChannels = () => {
  return useQuery<Channel[]>({
    queryKey: MY_CHANNELS,
    queryFn: getMyChannels,
  });
};
