import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Channel } from '../@types/channel';
import { createChannel, getChannels } from '../api/channel';
import { ALL_CHANNELS, MY_CHANNELS } from '../constants/channel';

export const useChannels = () => {
  return useQuery<Channel[]>({
    queryKey: ALL_CHANNELS,
    queryFn: getChannels,
    staleTime: 1000 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useCreateChannel = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_CHANNELS });
      queryClient.invalidateQueries({ queryKey: MY_CHANNELS });
    },
  });
};
