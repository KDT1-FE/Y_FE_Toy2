import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { AddIcon, EditIcon, ArrowRightIcon, ChatIcon } from '@chakra-ui/icons';

const SideBar = () => {
  return (
    <Box
      w="250px" // 너비 설정
      h="100vh" // 높이 설정
      bg="gray.50" // 배경색 설정
      color="black" // 글자색 설정
      p={10} // 안쪽 패딩 설정
      position="fixed" // 고정 위치 설정
      left={0} // 왼쪽 위치
      boxShadow="xl"
    >
      <Text fontSize="4xl" fontWeight="extrabold" mb={6}>
        로고자리
      </Text>
      <Box color="#828C98">
        <Text mb={4}>
          <ArrowRightIcon mr={2} />
          전체 채팅방 보기
        </Text>

        <Text mb={4}>
          <AddIcon mr={2} />
          새로운 채팅방 생성
        </Text>

        <Text mb={4}>
          <EditIcon mr={2} />
          개인 정보 수정
        </Text>
      </Box>
      <Box mt={100}>
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          나의 채팅방
        </Text>
        <Box>
          <Text>
            <ChatIcon mr={2} /> 채팅방1 예시
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
