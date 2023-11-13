import React, { useState, useEffect } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import useChannels from '../../hooks/useChannels';
import ChannelCard from './ChannelCard';
import ChannelSelector from './ChannelSelector';
import { splitChannelName } from '../../utils';

const ChannelList = () => {
  const { data: channels, isLoading } = useChannels();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log(selectedCategory);
    handleCategoryChange(selectedCategory);
    // 여기에서 상태값이 변경된 후 수행할 작업을 추가할 수 있습니다.
  }, [selectedCategory]);

  if (isLoading) return <div>Loading...</div>;

  if (channels && channels.length === 0) return <div>채팅방이 없습니다.</div>;

  const filteredChannels =
    selectedCategory === '전체'
      ? channels
      : channels?.filter((channel) => {
          const { category } = splitChannelName(channel.name);
          return category === selectedCategory;
        });

  return (
    <>
      <Box>
        <ChannelSelector onSelectCategory={handleCategoryChange} />
        <div>{selectedCategory}</div>
      </Box>
      <Box>
        <HStack gap="4" flexWrap="wrap">
          {filteredChannels &&
            filteredChannels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
        </HStack>
      </Box>
    </>
  );
};

export default ChannelList;
