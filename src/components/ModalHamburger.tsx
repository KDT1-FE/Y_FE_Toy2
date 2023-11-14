import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "../style/Modal.css";
import useApi from "../hooks/useApi";
import { ChatI } from "../pages/Chat";
import { getTime } from "../utils/getTime";

const ModalExample = ({ roomId, setChatRoom }: ModalHamburgerProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { patchData, getData } = useApi();

  const openModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  const leaveChatRoom = async (roomId: string) => {
    try {
      const requestBody = {
        chatId: roomId
      };

      const res = await patchData(
        `https://fastcampus-chat.net/chat/leave`,
        requestBody
      );

      res;

      const data = await getData("https://fastcampus-chat.net/chat");
      const chatData = data.chats;

      const myRoom = getTime(chatData);

      setChatRoom(myRoom);
      console.log("success");
    } catch (error) {
      console.log(error);
    }
  };

  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 밖 클릭 시 메뉴 숨기기
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setModalIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <ModalWrap ref={menuRef}>
      <HamButton onClick={() => openModal()}>
        <img src="/src/assets/images/menu-ico.png" alt="메뉴" width="30" />
      </HamButton>
      {modalIsOpen && (
        <ButtonWrap>
          <button>대화상대 초대하기</button>
          <button onClick={() => leaveChatRoom(roomId)}>채팅방 나가기</button>
        </ButtonWrap>
      )}
    </ModalWrap>
  );
};

export default ModalExample;

interface ModalHamburgerProps {
  roomId: string;
  setChatRoom: React.Dispatch<React.SetStateAction<ChatI[]>>;
}

const ModalWrap = styled.div`
  position: relative;
`;

const HamButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;

const ButtonWrap = styled.div`
  position: absolute;
  background-color: red;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e4e4e4;
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  button {
    cursor: pointer;
    width: 190px;
    padding: 15px 10px;
    border: none;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    color: #999696;
  }
`;
