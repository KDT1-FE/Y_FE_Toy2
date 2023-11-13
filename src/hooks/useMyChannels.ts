import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyChannels } from '../api/channel';

export const useMyChannels = () => {
  const { data: myChannelsQuery } = useQuery({
    queryKey: ['my-channels'],
    queryFn: getMyChannels,
  });

  return myChannelsQuery;
};
