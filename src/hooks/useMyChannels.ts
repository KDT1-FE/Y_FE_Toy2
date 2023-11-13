import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyChannels } from '../api/channel';
import { Channel } from '../@types/channel';

export const useMyChannels = () => {
  return useQuery({
    queryKey: ['my-channels'],
    queryFn: getMyChannels,
  });
};

// export const useMyChannels = () => {
//   return useMutation({
//     mutationFn: getMyChannels,
//     onSuccess: (data) => {
//       return data;
//     },
//   });
// };

// export const useParticipateChannel = (chatId: string) => {
//   const { data: participateChannelQuery, isLoading } = useQuery<Channel[]>({
//     queryKey: ['participateChannel',chatId],
//     queryFn: participateChannel(chatId),
//   });

//   return participateChannelQuery;
// };
