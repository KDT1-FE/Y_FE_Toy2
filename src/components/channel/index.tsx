import React, { useState, useEffect, useDeferredValue } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useChannels } from '../../hooks/useChannels';
import ChannelCard from './ChannelCard';
import { filterChannels } from '../../utils';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';
import ChannelSelector from './ChannelSelector';
import { useRecoilValue } from 'recoil';
import { channelState } from '../../recoil/channel.atom';

const ChannelList = () => {
  const { data: channels, isLoading, isFetching } = useChannels();
  const channel = useRecoilValue(channelState);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log(selectedCategory);
    handleCategoryChange(selectedCategory);
    // 여기에서 상태값이 변경된 후 수행할 작업을 추가할 수 있습니다.
  }, [selectedCategory]);

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

  if (filteredChannels.length === 0) return <div>채팅방이 없습니다.</div>;

  return (
    <>
      <Box>
        <ChannelSelector onSelectCategory={handleCategoryChange} />
        <div>{selectedCategory}</div>
      </Box>
      <Box>
        <HStack gap="4" flexWrap="wrap">
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default ChannelList;
