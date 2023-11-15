import { useDeferredValue } from 'react';
import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';
import { useChannels } from '../../hooks/useChannels';
import ChannelCard from './ChannelCard';
import { filterChannels } from '../../utils';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';
import { useRecoilValue } from 'recoil';
import {
  categoryChannelState,
  modalChannelState,
} from '../../recoil/channel.atom';

const ChannelList = () => {
  const { data: channels, isLoading, isFetching } = useChannels();
  const channel = useRecoilValue(modalChannelState);
  const selectedCategory = useRecoilValue(categoryChannelState);

  const deferredTitle = useDeferredValue(channel.title);
  const filteredChannels = channels
    ? filterChannels(deferredTitle, selectedCategory.category, channels)
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
