import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Center,
} from '@chakra-ui/react';
import UserInviteList from './UserInviteList';

const UserInviteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef(null);
  return (
    <>
      <Button mt={3} ref={btnRef} onClick={onOpen}>
        Trigger modal
      </Button>

      <Modal
        size="sm"
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <Center>
          <ModalContent>
            <ModalHeader textAlign="center">유저 목록</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <UserInviteList />
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Button
                size="lg"
                mr="3px"
                colorScheme="blue"
                variant="outline"
                onClick={onClose}
              >
                취소
              </Button>
              <Button size="lg" colorScheme="blue" onClick={onClose}>
                초대
              </Button>
            </ModalFooter>
          </ModalContent>
        </Center>
      </Modal>
    </>
  );
};

export default UserInviteModal;
