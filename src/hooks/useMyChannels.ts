import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyChannels } from '../api/channel';
import { Channel } from '../@types/channel';

export const useMyChannels = () => {
  return useQuery<Channel[]>({
    queryKey: ['my-channels'],
    queryFn: getMyChannels,
  });
};
