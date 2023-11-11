import React, { useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import styled from "styled-components";
import "../style/Modal.css";
import useApi from "../hooks/useApi";

interface User {
  id: string;
  name: string;
  picture: string;
}

const ModalExample = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<User[]>([]);
  const { getData } = useApi();

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

  const handleCheckboxChange = (userId: string) => {
    console.log("유저 id:", userId);
  };

  const ChatTestWrap = styled.div`
    width: 100%;
    background-color: #fff;
  `;

  const SmallImg = styled.img`
    width: 30px;
    height: 30px;
  `;

  const PlusButton = styled.button`
    transition: all 0.3s;
    &:hover {
      transform: rotate(180deg);
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
      width: "30%",
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

  useEffect(() => {
    // fetch("https://fastcampus-chat.net/users", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     serverId: "1601075b",
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`
    //   }
    // })
    //   .then((response) => response.json() as unknown as User[])
    //   .then((data) => setOnlineUsers(data))
    //   .catch((error) => console.error("Error fetching online users:", error));

      const fetchData = async () => {
        try {
          const response = await getData("https://fastcampus-chat.net/users");
          setOnlineUsers(response)
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();

  }, []);

  return (
    <ChatTestWrap>
      <h1>모든 유저 정보</h1>
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
          <ul>
            {onlineUsers.map((user) => (
              <BoxContent key={user.id}>
                <li>
                  <SmallImg src={user.picture} alt={user.name} />
                  {user.name}
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </li>
              </BoxContent>
            ))}
          </ul>
        </MemberBox>
        <SubmitBtn>완료</SubmitBtn>
      </Modal>
    </ChatTestWrap>
  );
};

export default ModalExample;
