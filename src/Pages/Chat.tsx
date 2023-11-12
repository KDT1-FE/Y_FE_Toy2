import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoom from "../components/Chat/ChatRoom";
import ModalPlus from "../components/ModalPlus";
import useApi from "../hooks/useApi";
import { AuthContext } from "../hooks/useAuth";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData("https://fastcampus-chat.net/chat");
        const chatData = data.chats;
        console.log(chatData);

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
  }, [accessToken]);

  return (
    <>
      <ChatWrapper>
        <ChatCategory>
          {chatRoom.map((room) => (
            <CateLink key={room.id}>
              <div className="catelink__wrap">
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
            />
          </CatePlus>
        </ChatCategory>
        <ChatRoom roomName={roomName} selectedUsers={selectedUsers} />
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
