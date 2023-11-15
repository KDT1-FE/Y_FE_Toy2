import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoom from "../components/Chat/ChatRoom";
import ModalPlus from "../components/ModalPlus";
import useApi from "../hooks/useApi";
import { AuthContext } from "../hooks/useAuth";
import io, { Socket } from "socket.io-client";

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

function Chat() {
  const [chatRoom, setChatRoom] = useState<ChatI[]>([]);
  const [roomName, setRoomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { getData } = useApi();
  const { accessToken } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const data = await getData("https://fastcampus-chat.net/chat");
          const chatData = data.chats;
          const myRoom = chatData.map((room: ChatI) => {
            // 시간 계산
            const updatedAt = room.updatedAt;
            const givenDate: Date = new Date(updatedAt);
            const currentDate: Date = new Date();
            const timeDifference = currentDate.getTime() - givenDate.getTime();
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));

            let updatedAtString: string;

            if (minutesDifference < 1) {
              updatedAtString = "방금 전";
            } else if (minutesDifference < 60) {
              updatedAtString = `${minutesDifference}분 전`;
            } else {
              const hoursDifference = Math.floor(minutesDifference / 60);
              updatedAtString = `${hoursDifference}시간 전`;
            }

            // const latestMessage = room.latestMessage || "메시지가 없습니다.";
            return {
              ...room,
              updatedAt: updatedAtString
              // latestMessage: latestMessage
            };
          });

          setChatRoom(myRoom);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [accessToken]);

  const handleClick = (roomId: string) => {
    setRoomId(roomId);
    console.log("클릭된 방 아이디", roomId);
  };

  // 새로운 채팅방 추가 함수
  const addNewChatRoom = (newRoomName: string, newSelectedUsers: User[]) => {
    const newRoom: ChatI = {
      id: Math.random().toString(), // 임시 ID 생성, 서버에서 ID 생성 시 변경 필요
      name: newRoomName,
      users: newSelectedUsers,
      isPrivate: false, // 필요에 따라 설정
      updatedAt: new Date().toISOString(), // 현재 시간, 서버에서 설정할 수도 있음
      latestMessage: "" // 필요에 따라 설정
    };

    setChatRoom([...chatRoom, newRoom]); // 기존 채팅방 목록에 새로운 채팅방 추가
  };

  return (
    <>
      <ChatWrapper>
        <ChatCategory>
          {chatRoom.map((room) => (
            <CateLink key={room.id}>
              <div
                className="catelink__wrap"
                onClick={() => handleClick(room.id)}
              >
                <div className="catelink__name">
                  <p className="tit">{room.name}</p>
                </div>
                <div className="catelink__time">{room.updatedAt}</div>
              </div>
            </CateLink>
          ))}
          <CatePlus>
            <ModalPlus
              setRoomName={setRoomName}
              setSelectedUsers={setSelectedUsers}
              addNewChatRoom={addNewChatRoom} // 함수를 ModalPlus에 전달
            />
          </CatePlus>
        </ChatCategory>

        <ChatRoom
          roomId={roomId}
          roomName={roomName}
          selectedUsers={selectedUsers}
          setChatRoom={setChatRoom}
        />
      </ChatWrapper>
    </>
  );
}

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
  border-top: 1px solid #e8e8e8;
  border-left: 1px solid #e8e8e8;
  height: 100%;
`;

const ChatCategory = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1 0 30%;
  max-width: 30%;
  border-right: 1px solid #e8e8e8;
`;

const CateLink = styled.li`
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  .catelink {
    &__wrap {
      gap: 16px;
      width: 100%;
    }
    &__name {
      font-size: 16px;
      .tit {
        margin-bottom: 10px;
        color: black;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 2px;
      }
      .content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999696;
      }
    }
    &__time {
      text-align: right;
      font-size: 14px;
      color: #999696;
      white-space: nowrap;
    }
  }
`;

const CatePlus = styled.div`
  text-align: center;
  padding: 20px 0;
  button {
    border: none;
    outline: none;
    background-color: white;
  }
  button:hover {
    cursor: pointer;
  }
  img {
    width: 30px;
  }
`;
