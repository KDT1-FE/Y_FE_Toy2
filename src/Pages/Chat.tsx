import styled from "styled-components";
import ChatRoom from "../components/Chat/ChatRoom";
import ModalPlus from "../components/ModalPlus";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../hooks/useAuth";
import useApi from "../hooks/useApi";

interface User {
  id: string;
  username: string;
  picture: string;
}

export interface ChatI {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: string;
  latestMessage: string | null;
}

function Chat() {
  const [chatRoom, setChatRoom] = useState<ChatI[]>([]);
  const { getData } = useApi();

  // const fetchMyRoom = async () => {
  //   try {
  //     const response = await axios.get('https://fastcampus-chat.net/chat', {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         serverId: '1601075b',
  //       }
  //     });
  
  //     const roomData = response.data
  //     return roomData;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // 모든 채팅방 조회
  useEffect(() => {
    const fetchData = async () => {
      try{
        const data = await getData("https://fastcampus-chat.net/chat");
        const chatData = data.chats;
        // setChatRoom(chatData);
        console.log(chatData);
      } catch (error){
        console.error(error)
      }
    }
    fetchData();
    // const fetchData = async () => {
    //   try {
    //     const data = await fetchMyRoom();
    //     const myRoom = data.chats.map((room: ChatI) => {
    //       // 시간 계산
    //       const updatedAt = room.updatedAt;
    //       const givenDate: Date = new Date(updatedAt);
    //       const currentDate: Date = new Date();
    //       const timeDifference = currentDate.getTime() - givenDate.getTime();
    //       const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    //       let updatedAtString: string;

    //       if (minutesDifference < 1) {
    //         updatedAtString = "방금 전";
    //       } else if (minutesDifference < 60) {
    //         updatedAtString = `${minutesDifference}분 전`;
    //       } else {
    //         const hoursDifference = Math.floor(minutesDifference / 60);
    //         updatedAtString = `${hoursDifference}시간 전`;
    //       }

    //       const latestMessage = room.latestMessage || "메시지가 없습니다.";

    //       return {
    //         ...room,
    //         updatedAt: updatedAtString,
    //         latestMessage: latestMessage
    //       };
    //     });

    //     setChatRoom(myRoom);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchData();
  }, []);
  

  return (
    <>
      {/* <div>
        채팅방이 없습니다
      </div> */}
      <ChatWrapper>
        <ChatCategory>
          {chatRoom.map((room) => (
            <CateLink>
              <div className="catelink__wrap">
                <div className="catelink__name">
                  <p className="tit">{room.name}</p>
                  <p className="content">{room.latestMessage}</p>
                </div>
                <div className="catelink__time">{room.updatedAt}</div>
              </div>
            </CateLink>
          ))}
          <CatePlus>
            <ModalPlus />
          </CatePlus>
        </ChatCategory>
        <ChatRoom />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  .catelink {
    &__wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      width: 100%;
    }
    &__img {
      width: 70px;
      border-radius: 50%;
      display: block;
      position: relative;
      overflow: hidden;
      img {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: auto;
        height: auto;
        min-width: 1000%;
        min-height: 1000%;
        max-width: none;
        max-height: none;
        -webkit-transform: translate(-50%, -50%) scale(0.1);
        transform: translate(-50%, -50%) scale(0.1);
      }
      &:after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
    }
    &__name {
      font-size: 16px;
      flex: 1 0 50%;
      max-width: 50%;
      .tit {
        margin-bottom: 10px;
        color: black;
      }
      .content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999696;
      }
    }
    &__time {
      flex: 1 0 15%;
      max-width: 15%;
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
