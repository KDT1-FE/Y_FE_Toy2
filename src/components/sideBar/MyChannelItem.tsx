import { LockIcon, ViewIcon } from '@chakra-ui/icons';
import { Box, Flex, Badge } from '@chakra-ui/layout';
import React from 'react';
import { splitChannelName } from '../../utils';
import { CATEGORY_COLOR_SCHEMES } from '../../constants/channel';

interface Props {
  myChannelName: string;
  isPrivate: boolean;
}

// 나중에 채널 아이디 받아서 Link 처리
const MyChannelItem = ({ myChannelName, isPrivate }: Props) => {
  const { title, category } = splitChannelName(myChannelName);

  return (
    <Flex align="center" mb="1rem">
      {isPrivate ? (
        <ViewIcon boxSize="1.4rem" />
      ) : (
        <LockIcon boxSize="1.5rem" />
      )}
      <Box ml="1rem" mr="0.5rem">
        {title}
      </Box>
      <Badge colorScheme={CATEGORY_COLOR_SCHEMES[`${category}`]}>
        {category}
      </Badge>
    </Flex>
  );
};

export default MyChannelItem;
