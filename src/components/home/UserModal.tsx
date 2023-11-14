import React from 'react';
import ReactDom from 'react-dom';
import Backdrop from '../../styles/home/UserModal.styled';
import ListProfile from './ListProfile';
import { UserData } from '../../utils/utils';

function ModalOverlay({
  userData,
  onCloseModal,
}: {
  userData: UserData;
  onCloseModal: () => void;
}) {
  return <ListProfile userData={userData} onCloseModal={onCloseModal} />;
}

function BackDrop({
  userData,
  onCloseModal,
}: {
  userData: UserData;
  onCloseModal: () => void;
}) {
  return (
    <Backdrop>
      <ModalOverlay userData={userData} onCloseModal={onCloseModal} />
    </Backdrop>
  );
}

function UserModal({
  userData,
  onCloseModal,
}: {
  userData: UserData;
  onCloseModal: () => void;
}) {
  return (
    <>
      {ReactDom.createPortal(
        <BackDrop userData={userData} onCloseModal={onCloseModal} />,
        document.getElementById('backdrop-root') as HTMLElement,
      )}
    </>
  );
}

export default UserModal;
