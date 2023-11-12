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
import { AddIcon } from '@chakra-ui/icons';
import UserInviteList from './UserInviteList';

const UserInviteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef(null);
  return (
    <>
      <AddIcon boxSize="25px" color="#191919" ref={btnRef} onClick={onOpen} />

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
            <ModalHeader textAlign="center" my="10px">
              유저 목록
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              {/* map으로 뿌리는거 구현 */}
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
