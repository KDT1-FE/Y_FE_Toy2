import { useState } from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import styled from "styled-components";

const ModalExample = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openBlock = () => {
    const memberBox = document.getElementById("memberBox");
    if (memberBox) {
      const currentDisplay = window
        .getComputedStyle(memberBox)
        .getPropertyValue("display");
      memberBox.style.display = currentDisplay === "none" ? "block" : "none";
    }
  };

  const PlusButton = styled.button`
    img:hover {
      border-radius: 20px;
      background-color: gray;
    }
  `;

  const TopTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin: 30px 0 50px 0;
  `;

  const SubTitle = styled.h5`
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0 8px 0;
  `;

  const InputArea = styled.input`
    &::placeholder {
      font-size: 16px;
    }
    border: 1px solid lightgray;
    border-radius: 6px;
    font-size: 20px;
    padding: 5px 20px;
    margin-bottom: 6px;
    width: 80%;
  `;

  const InputBtn = styled.button`
    &:hover {
      background-color: whitesmoke;
      cursor: pointer;
    }
    font-size: 16px;
    border: 1px solid lightgray;
    border-radius: 6px;
    padding: 8px 20px;
    margin-bottom: 6px;
    width: 90%;
    background-color: #fff;
  `;

  const MemberBox = styled.div`
    display: none;
    width: 90%;
    height: 30%;
    border: 1px solid lightgray;
    margin-top: 20px;
    overflow-y: scroll;
  `;

  const BoxContent = styled.div`
    display: flex;
    align-items: center;
    height: 34%;
    margin-bottom: 1px solid lightgray;
  `;

  const SubmitBtn = styled.button`
    &:hover {
      background-color: #ff8a7a;
      cursor: pointer;
    }
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f43630;
    color: #fff;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    padding: 16px 60px;
  `;

  const customStyles: Styles = {
    content: {
      width: "24%",
      height: "500px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
      borderRadius: "20px"
    }
  };

  return (
    <div>
      <PlusButton onClick={openModal}>
        <img src="./src/assets/images/plus-ico.png" alt="플러스" />
      </PlusButton>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-back"
      >
        <TopTitle>채팅방 새로만들기</TopTitle>
        <SubTitle>채팅방 이름</SubTitle>
        <InputArea placeholder="방명을 입력해주세요" />
        <SubTitle>초대할 멤버</SubTitle>
        <InputBtn onClick={openBlock}>초대할 멤버를 선택해주세요 ▼</InputBtn>
        <MemberBox id="memberBox">
          <BoxContent>가길동</BoxContent>
          <BoxContent>나길동</BoxContent>
          <BoxContent>다길동</BoxContent>
        </MemberBox>
        <SubmitBtn>완료</SubmitBtn>
      </Modal>
    </div>
  );
};

export default ModalExample;
