import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyChannels } from '../api/channel';

//내 채팅방 목록 가져오기
export const useMyChannels = () => {
  const { data: myChannelsQuery } = useQuery({
    queryKey: ['channels'],
    queryFn: getMyChannels,
  });

  return myChannelsQuery;
};
