import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';
import { useChannels } from '../../hooks/useChannels';
import useFilteredChannels from '../../hooks/useFilteredChannels';
import ChannelCard from './ChannelCard';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';

const ChannelList = () => {
  const { data: channels, isLoading, isFetching } = useChannels();
  const filteredChannels = channels ? useFilteredChannels(channels) : [];

  if (isLoading || isFetching)
    return (
      <HStack>
        {skeletons.map((_i, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </HStack>
    );

  return (
    <Box>
      <Grid
        gap={4}
        gridTemplateColumns={'repeat(auto-fit, minmax(220px, 1fr))'}
      >
        {filteredChannels.length === 0 ? (
          <div>채팅방이 없습니다.</div>
        ) : (
          filteredChannels.map((channel) => (
            <GridItem key={channel.id}>
              <ChannelCard channel={channel} />
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default ChannelList;
