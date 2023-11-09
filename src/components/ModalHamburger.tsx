import { useState } from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import styled from "styled-components";
import "../style/Modal.css";

const ModalExample = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const ModalWrap = styled.div`
    position: relative;
  `;

  const HamButton = styled.button`
    img:hover {
      border-radius: 8px;
      background-color: lightgray;
    }
  `;

  const AddButton = styled.button`
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
    width: 120px;
    border: none;
    margin-bottom: 1px;
    background-color: #fff;
  `;

  const OutButton = styled.button`
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
    width: 120px;
    border: none;
    background-color: #fff;
  `;

  const customStyles: Styles = {
    content: {
      width: "120px",
      height: "40px",
      zIndex: "150",
      position: "absolute",
      top: "20%",
      left: "0",
      justifyContent: "center",
      overflow: "auto",
      border: "1px solid lightgray",
      borderRadius: "8px"
    }
  };

  return (
    <ModalWrap>
      <HamButton onClick={openModal}>
        <img src="/src/assets/images/menu-ico.png" alt="메뉴" width="30" />
      </HamButton>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
      >
        <AddButton>대화상대 초대하기</AddButton>
        <OutButton>채팅방 나가기</OutButton>
      </Modal>
    </ModalWrap>
  );
};

export default ModalExample;
