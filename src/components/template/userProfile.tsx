import { Box, Center, Flex, Text, Button } from '@chakra-ui/react';

const UserProfile = () => {
  return (
    <Flex
      width={450}
      height={160}
      backgroundImage={'src/assets/icons/card.png'}
      borderRadius={10}
      alignItems={'center'}
      justifyContent={'center'}
      color={'white'}>
      <Box
        width={100}
        height={100}
        backgroundColor="#D9D9D9"
        borderRadius={10}
        marginRight={23}></Box>
      <Box>
        <Text fontWeight="600" marginBottom={3}>
          아이디
        </Text>
        <Text marginBottom={3}>닉네임</Text>
        <Box>
          <Button width={130} height="32px" marginRight={2}>
            회원 정보 수정
          </Button>
          <Button width={130} height="32px">
            로그아웃
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default UserProfile;
