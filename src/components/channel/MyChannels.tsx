import { Grid, GridItem, HStack } from '@chakra-ui/react';
import { useMyChannels } from '../../hooks/useMyChannels';
import ChannelCard from './ChannelCard';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';
import { useRecoilValue } from 'recoil';
import {
  categoryChannelState,
  modalChannelState,
} from '../../recoil/channel.atom';
import { useDeferredValue } from 'react';
import { filterChannels } from '../../utils';

const MyChannels = () => {
  const { data: channels, isLoading } = useMyChannels();
  const channel = useRecoilValue(modalChannelState);
  const selectedCategory = useRecoilValue(categoryChannelState);

  const deferredTitle = useDeferredValue(channel.title);

  const filteredChannels = channels
    ? filterChannels(deferredTitle, selectedCategory.category, channels)
    : [];

  if (isLoading || !channels)
    return (
      <HStack>
        {skeletons.map((_i, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </HStack>
    );

  return (
    <Grid gap={4} gridTemplateColumns={'repeat(auto-fit, minmax(220px, 1fr))'}>
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
  );
};

export default MyChannels;
