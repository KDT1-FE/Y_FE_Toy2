import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { createGameRooms } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { allRoomState } from '../../states/atom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  randomName: string;
}

const NewGameRoomModal: React.FC<ModalProps> = ({
  randomName,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [allRooms, setAllRooms] = useRecoilState(allRoomState);

  const navigate = useNavigate();

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setName(randomName);
    }
    const check = await createGameRooms(name, [], false);
    if (check === undefined) {
      alert('중복된 방이 있습니다.');
    } else {
      alert('방 생성 성공.');
      setAllRooms([...allRooms, check]);
      navigate(`/room/:${check.id}`);
    }
  };

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent height={250}>
        <ModalHeader>방 만들기</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} paddingTop="0">
          <form onSubmit={handleEditSubmit}>
            <FormControl marginTop={1} marginBottom={5}>
              <FormLabel paddingTop="0">방 제목</FormLabel>
              <Input
                placeholder={randomName}
                _placeholder={{ fontSize: 'sm' }}
                borderColor={'gray.200'}
                autoComplete="on"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                width="388px"
                height="50px"
                justifyContent={'center'}
              />
            </FormControl>
            <Button
              width="390px"
              height="50px"
              type="submit"
              size="lg"
              color="white"
              bg={'#4FD1C5'}
              _hover={{
                bg: '#9AEBE0',
              }}
              _disabled={{
                bg: '#CBD5E0',
              }}>
              방 만들기
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default NewGameRoomModal;
