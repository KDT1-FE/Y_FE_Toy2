import React, { useState, useEffect, useDeferredValue } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useChannels } from '../../hooks/useChannels';
import ChannelCard from './ChannelCard';
import { filterChannels } from '../../utils';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';
import ChannelSelector from './ChannelSelector';
import { useRecoilValue } from 'recoil';
import { modalChannelState } from '../../recoil/channel.atom';

const ChannelList = () => {
  const { data: channels, isLoading, isFetching } = useChannels();
  const channel = useRecoilValue(modalChannelState);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const deferredTitle = useDeferredValue(channel.title);
  const filteredChannels = channels
    ? filterChannels(deferredTitle, selectedCategory, channels)
    : [];

  if (isLoading || isFetching)
    return (
      <HStack>
        {skeletons.map((_i, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </HStack>
    );

  return (
    <>
      <Box>
        <ChannelSelector onSelectCategory={handleCategoryChange} />
      </Box>
      <Box>
        <HStack gap="4" flexWrap="wrap">
          {filteredChannels.length === 0 ? (
            <div>채팅방이 없습니다.</div>
          ) : (
            filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))
          )}
        </HStack>
      </Box>
    </>
  );
};

export default ChannelList;
