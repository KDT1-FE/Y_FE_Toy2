import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyChannels } from '../api/channel';

export const useMyChannels = () => {
  return useQuery({
    queryKey: ['my-channels'],
    queryFn: getMyChannels,
  });
};
