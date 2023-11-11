import React from 'react';
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

const ChannelExitDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

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
            <Button colorScheme="blue" ml={3}>
              나가기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ChannelExitDialog;
