import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const Chat = () => {
  return (
    <Flex w="full" pt="2" pb="3">
      <Avatar
        name="Dan Abrahmov"
        src="https://bit.ly/dan-abramov"
        w="3.125rem"
        h="3.125rem"
        borderRadius="full"
        mr="2.5"
      ></Avatar>
      <Box>
        <Flex>
          <Text fontSize="md" fontWeight="semibold">
            새콤달콤
          </Text>
          <Text
            alignSelf="end"
            ml="2"
            fontSize="xs"
            color="RGBA(0, 0, 0, 0.48)
    "
          >
            2022.03.01
          </Text>
        </Flex>

        <Text fontSize="0.85rem" margin="0" pt="0.5">
          안녕하세요 테스트입니다
        </Text>
      </Box>
    </Flex>
  );
};

export default Chat;
