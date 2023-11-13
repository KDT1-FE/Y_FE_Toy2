import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Select, Icon, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import NewGameRoomModal from './newGameRommModal';
const LobbyListTop = () => {
  const [sortOption, setSortOption] = useState('');
  const [selectOption, setSelectOption] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [randomName, setRandomName] = useState('');
  // 랜덤 방제목 정하는 함수
  const randomNameFunc = () => {
    const data = [
      '캐치마인드 신나는 한 판~!',
      '아이브 영원하라',
      '그림 고수분만',
      '초보만 들어오세요',
      '중랑 12여 남자만',
      '15살 수다방',
      '김가을양재혁',
      '안유진은 양재혁 여친',
      '살려주세요',
      '패캠 뒷담방 ex) 돈 내놔....',
    ];

    const randomIndex = Math.floor(Math.random() * data.length);
    const randomPick = data[randomIndex];
    setRandomName(randomPick);
  };

  return (
    <>
      <Flex justifyContent={'space-between'} paddingBottom="10px">
        <Select
          placeholder={selectOption}
          width={260}
          height="40px"
          backgroundColor={'white'}
          borderColor={'gray.200'}
          fontSize={16}>
          <option value="option1">모든 게임방 보기</option>
          <option value="option2">참여 가능한 게임방 보기</option>
        </Select>
        <Flex width={230} justifyContent={'space-between'}>
          <Button
            leftIcon={<Icon as={AddIcon} w={3} h={3} />}
            size="md"
            backgroundColor={'teal.300'}
            color={'white'}
            _hover={{
              backgroundColor: 'teal.200',
            }}
            onClick={() => {
              randomNameFunc();
              onOpen();
            }}>
            방 만들기
          </Button>
          <Button
            leftIcon={<ArrowRightIcon w={3} h={3} />}
            size="md"
            backgroundColor={'teal.400'}
            color={'white'}
            _hover={{
              backgroundColor: 'teal.500',
            }}>
            빠른 참가
          </Button>
        </Flex>
      </Flex>
      <NewGameRoomModal
        randomName={randomName}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default LobbyListTop;
