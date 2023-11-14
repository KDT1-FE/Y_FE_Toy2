import { Avatar, AvatarGroup, Badge, Box, Flex, Text } from '@chakra-ui/react';
import { formatTimeToKST, splitChannelName } from '../../utils';
import { Channel } from '../../@types/channel';
import { CATEGORY_COLOR_SCHEMES } from '../../constants/channel';
import { LockIcon } from '@chakra-ui/icons';

interface Props {
  channel: Channel;
}

const ChannelCard = ({ channel }: Props) => {
  const { title, category } = splitChannelName(channel.name);

  return (
    <Box
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      border="2px solid #cdcdcd"
      borderRadius="xl"
      boxShadow="md"
      p="4"
      w={220}
      h={150}
      _hover={{
        transform: 'translateY(-5px)',
        border: '2px solid #3182ce',
      }}
      transition={'all .15s ease-in-out'}
      cursor="pointer"
    >
      <Box>
        <Flex justifyContent="flex-start" alignItems="center" gap="2">
          <Text as="h2" fontSize="lg" fontWeight="bold" isTruncated>
            {title}
          </Text>
          <Badge colorScheme={CATEGORY_COLOR_SCHEMES[`${category}`]}>
            {category}
          </Badge>
          {channel.isPrivate && <LockIcon boxSize="3" opacity="0.5" />}
        </Flex>
        <Box mb="4">
          <Text isTruncated opacity={0.5} fontSize="sm">
            {channel.latestMessage?.text}
          </Text>
          <Text fontSize="xs">{formatTimeToKST(channel.updatedAt)}</Text>
        </Box>
      </Box>
      <Flex justifyContent="flex-end">
        <AvatarGroup size="sm" max={3}>
          {channel.users.map((user) => (
            <Avatar key={user.id} name={user.name} src={user.picture} />
          ))}
        </AvatarGroup>
      </Flex>
    </Box>
  );
};

export default ChannelCard;
