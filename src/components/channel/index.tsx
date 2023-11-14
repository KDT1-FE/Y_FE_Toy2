import { Box, HStack } from '@chakra-ui/react';
import { useChannels } from '../../hooks/useChannels';
import ChannelCard from './ChannelCard';
import { filterChannels } from '../../utils';
import { useDeferredValue } from 'react';
import LoadingSkeleton, { skeletons } from './LoadingSkeleton';

interface Props {
  title: string;
}

const ChannelList = ({ title }: Props) => {
  const { data: channels, isLoading, isFetching } = useChannels();

  const deferredTitle = useDeferredValue(title);
  const filteredChannels = channels
    ? filterChannels(deferredTitle, channels)
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
