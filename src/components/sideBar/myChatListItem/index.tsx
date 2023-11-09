import { Box } from '@chakra-ui/layout';
import React from 'react';

interface Props {
  chatName: string;
}

const MyChatListItem = ({ chatName }: Props) => {
  return <Box>{chatName}</Box>;
};

export default MyChatListItem;
