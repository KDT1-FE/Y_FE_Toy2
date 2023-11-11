import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CategoryInput from './CategoryInput';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { channelState } from '../../../recoil/channel.atom';
import { createChannel } from '../../../api/channel';
import { createChannelNameWithCategory } from '../../../utils';
import UserList from './UserList';

const CreateChannelModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channel, setChannel] = useRecoilState(channelState);
  const [users, setUsers] = useState<string[]>([]);
  const [isPrivate, setPrivate] = useState(false);

  const handleChannelName = (e: ChangeEvent<HTMLInputElement>) => {
    setChannel({ ...channel, title: e.target.value });
  };

  const handleCreateChannel = () => {
    const channelData = {
      name: createChannelNameWithCategory(channel.title, channel.category),
      users,
      isPrivate,
    };
    console.log(channelData);

    createChannel(channelData);
    onClose();
    setChannel({ title: '', category: '' });
  };

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        새로운 채팅
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>채널 만들기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" gap="2" mb="2">
              <Text fontWeight="bold">채널명</Text>
              <Checkbox
                isChecked={isPrivate}
                onChange={() => setPrivate(!isPrivate)}
                size="sm"
              >
                비공개
              </Checkbox>
            </Flex>
            <Input
              placeholder="채널명을 입력하세요."
              value={channel.title}
              onChange={handleChannelName}
              mb="2"
            />
            <CategoryInput />
            <Text as="h3" fontWeight="bold" mt="4">
              친구 초대
            </Text>
            <UserList setUsers={setUsers} />
          </ModalBody>
          <ModalFooter>
            <Button mr="3" onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue" onClick={handleCreateChannel}>
              만들기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChannelModal;
