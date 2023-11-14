import { Box, HStack } from '@chakra-ui/react';
import { useMyChannels } from '../../hooks/useMyChannels';
import ChannelCard from './ChannelCard';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';

const MyChannels = () => {
  const { data: myChannels, isLoading } = useMyChannels();

  if (isLoading || !myChannels)
    return (
      <HStack>
        {skeletons.map((_i, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </HStack>
    );

  return (
    <Box>
      <HStack gap="4" flexWrap="wrap">
        {myChannels.length === 0 ? (
          <div>채팅방이 없습니다.</div>
        ) : (
          myChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))
        )}
      </HStack>
    </Box>
  );
};

export default MyChannels;
