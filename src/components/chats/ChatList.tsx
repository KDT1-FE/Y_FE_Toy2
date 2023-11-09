import { Box } from '@chakra-ui/react';
import Chat from '.';

const ChatList = () => {
  const testArray = new Array(20).fill('');
  return (
    <Box
      maxWidth={700}
      m="0 auto"
      mt="5"
      h="85vh"
      pr="10"
      pl="5"
      pb="5"
      overflowX="auto"
      overflowY="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          width: '4',
          borderRadius: '4',
          backgroundColor: 'blackAlpha.100',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'blackAlpha.100',
        },
      }}
    >
      {testArray.map(() => {
        // eslint-disable-next-line react/jsx-key
        return <Chat />;
      })}
    </Box>
  );
};

export default ChatList;
