import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { MdExitToApp } from 'react-icons/md';
import { exitChannel } from '../../../api/channel';

interface Prop {
  chatId: string;
}

const ChannelExitDialog = ({ chatId }: Prop) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleExitChannel = async () => {
    try {
      await exitChannel({ chatId });
      onClose();
      navigate('/');
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <Icon
        as={MdExitToApp}
        boxSize="2.5rem"
        position="absolute"
        bottom="3rem"
        right="1rem"
        onClick={onOpen}
      />

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>채팅방 나가기</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>정말 채팅방을 나가시겠습니까?</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="blue" ml={3} onClick={handleExitChannel}>
              나가기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChannelExitDialog;
