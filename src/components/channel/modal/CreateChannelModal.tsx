import {
  Button,
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
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { channelState } from '../../../recoil/channel.atom';

const CreateChannelModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [channel, setChannel] = useRecoilState(channelState);

  const handleChannelName = (e: ChangeEvent<HTMLInputElement>) => {
    setChannel({ ...channel, title: e.target.value });
  };

  return (
    <>
      <Button onClick={onOpen}>open</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>채널 만들기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1">
              채널명
            </Text>
            <Text fontSize="sm" mb="3">
              {channel.title} {channel.category}
            </Text>
            <Input
              placeholder="채널명을 입력하세요."
              mb="1"
              value={channel.title}
              onChange={handleChannelName}
            />
            <CategoryInput />
          </ModalBody>
          <ModalFooter>
            <Button mr="3" onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue">만들기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateChannelModal;
