import { Grid, GridItem, HStack } from '@chakra-ui/react';
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
    <Grid gap={4} gridTemplateColumns={'repeat(auto-fit, minmax(220px, 1fr))'}>
      {myChannels.length === 0 ? (
        <div>채팅방이 없습니다.</div>
      ) : (
        myChannels.map((channel) => (
          <GridItem key={channel.id}>
            <ChannelCard channel={channel} />
          </GridItem>
        ))
      )}
    </Grid>
  );
};

export default MyChannels;
