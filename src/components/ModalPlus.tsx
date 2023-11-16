import React, { useCallback, useContext, useEffect, useState } from "react";
import Modal, { Styles } from "react-modal";
import styled from "styled-components";
import "../style/Modal.css";
import useApi from "../hooks/useApi";
import { AuthContext } from "../hooks/useAuth";
import { Socket, io } from "socket.io-client";
import PlusIcon from "../assets/images/plus-ico.png";

export interface User {
  id: string;
  name: string;
  picture: string;
}

export interface ChatI {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: string;
  latestMessage: string;
}

interface ModalExampleProps {
  setRoomName: (name: string) => void;
  setSelectedUsers: (users: User[]) => void;
  loginUser: User | null;
}

const ModalExample: React.FC<
  ModalExampleProps & { addNewChatRoom: (name: string, users: User[]) => void }
> = ({ setSelectedUsers, addNewChatRoom, setRoomName, loginUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { getData } = useApi();
  const { accessToken } = useContext(AuthContext);
  const [roomNameInput, setRoomNameInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [localSelectedUsers, setLocalSelectedUsers] = useState<User[]>([]); //보류

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData("https://fastcampus-chat.net/users");
        setUsers(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 현재 온라인인 유저 실시간 출력
  useEffect(() => {
    if (!socket && accessToken) {
      const newSocket = io(`https://fastcampus-chat.net/server`, {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`,
          serverId: "1601075b"
        }
      });

      newSocket.on(
        "users-server-to-client",
        (response: { users: string[] }) => {
          console.log("Online Users:", response.users);
          setOnlineUsers(response.users);
        }
      );

      setSocket(newSocket);

      return () => {
        console.log("Disconnecting socket");
        newSocket.off("users-to-client");
        newSocket.disconnect();
      };
    }
  }, [accessToken]);

  // 모든 유저 중 현재 온라인인 유저만 필터링
  const isUserOnline = useCallback(
    (userId: string) => {
      return onlineUsers.includes(userId);
    },
    [onlineUsers]
  );

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
    const selectedUser = users.find((user) => user.id === userId);
    if (!selectedUser) return;

    const isSelected = localSelectedUsers.some((user) => user.id === userId);

    if (isSelected) {
      setLocalSelectedUsers(
        localSelectedUsers.filter((user) => user.id !== userId)
      );
    } else {
      setLocalSelectedUsers([...localSelectedUsers, selectedUser]);
    }
  };

  const submitModal = async () => {
    await setRoomName(roomNameInput);

    if (loginUser) {
      await setSelectedUsers([...localSelectedUsers, loginUser]);
    } else {
      await setSelectedUsers([...localSelectedUsers]);
    }

    await addNewChatRoom(roomNameInput, localSelectedUsers);
    await closeModal();
  };

  return (
    <ChatTestWrap>
      <PlusButton onClick={openModal}>
        <img src={PlusIcon} alt="플러스" />
      </PlusButton>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-back"
      >
        <TopTitle>채팅방 새로만들기</TopTitle>
        <SubTitle>채팅방 이름</SubTitle>
        <InputArea
          placeholder="방명을 입력해주세요"
          value={roomNameInput}
          onChange={(e) => setRoomNameInput(e.target.value)}
        />
        <SubTitle>초대할 멤버</SubTitle>
        <InputBtn onClick={openBlock}>초대할 멤버를 선택해주세요 ▼</InputBtn>
        <MemberBox id="memberBox">
          <ul>
            {users.map((user) => (
              <BoxContent key={user.id}>
                <li>
                  <SmallImg src={user.picture} alt={user.name} />
                  {user.name}
                  <OnlineIndicator
                    className={isUserOnline(user.id) ? "online" : ""}
                  />
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </li>
              </BoxContent>
            ))}
          </ul>
        </MemberBox>
        <SubmitBtn onClick={submitModal}>완료</SubmitBtn>
      </Modal>
    </ChatTestWrap>
  );
};

export default ModalExample;

const ChatTestWrap = styled.div`
  width: 100%;
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
  text-align:center;
`;

const SubTitle = styled.h5`
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0 8px 0;
  color: black;
`;

const InputArea = styled.input`
  &::placeholder {
    font-size: 16px;
    color: #999696;
  }
  width:90%;
  border: 1px solid lightgray;
  border-radius: 6px;
  font-size: 20px;
  padding: 5px 20px;
  margin-bottom: 6px;
  color: #999696;
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
  width: 100%;
  background-color: #fff;
  color: #999696;
  text-align:left;
`;

const MemberBox = styled.div`
  display: none;
  width: 100%;
  height: 30%;
  border: 1px solid lightgray;
  margin-top: 10px;
  overflow-y: scroll;
  color: black;
`;

const BoxContent = styled.div`
  > li {
    display: flex;
    align-items: center;
    margin-bottom: 3px;
  }
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
  border-radius: 30px;
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

const OnlineIndicator = styled.span`
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;

  &.online {
    background-color: #0f0;
  }
`;
