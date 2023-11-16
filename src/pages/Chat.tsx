import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoom from "../components/Chat/ChatRoom";
import ModalPlus from "../components/ModalPlus";
import useApi from "../hooks/useApi";
import { AuthContext } from "../hooks/useAuth";
import Header from "../components/Header";
import NoneChat from "../components/Chat/NoneChat";

export interface User {
  id: string;
  name: string;
  picture: string;
}

export interface lastMes {
  createdAt: string;
  id: string;
  text: string;
  userId: string;
}

export interface ChatI {
  id: string;
  name: string;
  users: User[];
  isPrivate: boolean;
  updatedAt: string;
  latestMessage: lastMes;
}

function Chat() {
  const [chatRoom, setChatRoom] = useState<ChatI[]>([]);
  const [roomName, setRoomName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const { getData, postData } = useApi();
  const { accessToken } = useContext(AuthContext);
  const [roomId, setRoomId] = useState("");
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [isShowRoom, setIsShowRoom] = useState(false);
  const [rooms, setRooms] = useState<ChatI[]>([]);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const data = await getData("https://fastcampus-chat.net/chat");
          const chatData = data.chats;
          setRooms(chatData);
          const res = await getData(
            `https://fastcampus-chat.net/user?userId=${sessionStorage.getItem(
              "userId"
            )}`
          );
          setLoginUser(res.user);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [accessToken, roomId]);
  // TODO : 여기에 의존성배열로 chatRoom 을 넣어줘야하는데 그러면 너무 렌더링이 많아져서 또 채팅방 내역을 잘 못 불러옴
  useEffect(() => {
    if (rooms) {
      const sortRoom = async () => {
        rooms.sort((a: ChatI, b: ChatI) => {
          const timeA = new Date(a.updatedAt).getTime();
          const timeB = new Date(b.updatedAt).getTime();
          return timeB - timeA;
        });

        const myRoom = await Promise.all(
          rooms.map(async (room: ChatI) => {
            // 시간 계산
            const updatedAt = room.updatedAt;
            const givenDate: Date = new Date(updatedAt);
            const currentDate: Date = new Date();
            const timeDifference = currentDate.getTime() - givenDate.getTime();
            const minutesDifference = Math.floor(timeDifference / (1000 * 60));
            const hoursDifference = Math.floor(minutesDifference / 60);
            const daysDifference = Math.floor(hoursDifference / 24);

            let updatedAtString: string;

            if (minutesDifference < 1) {
              updatedAtString = "방금 전";
            } else if (minutesDifference < 60) {
              updatedAtString = `${minutesDifference}분 전`;
            } else if (hoursDifference < 24) {
              updatedAtString = `${hoursDifference}시간 전`;
            } else {
              updatedAtString = `${daysDifference}일 전`;
            }

            return {
              ...room,
              updatedAt: updatedAtString
            };
          })
        );
        await setChatRoom(myRoom);
      };
      sortRoom();
    }
  }, [rooms]);
  const handleClick = (roomId: string) => {
    setRoomId(roomId);
  };

  // 새로운 채팅방 추가 함수
  const addNewChatRoom = (newRoomName: string, selectedUsers: User[]) => {
    const fetchData = async () => {
      const userIds = selectedUsers.map((user) => user.id);
      const makeRoomBody = {
        name: newRoomName,
        users: [loginUser?.id, ...userIds]
      };
      const response = await postData(
        "https://fastcampus-chat.net/chat",
        makeRoomBody
      );

      setRooms((prev) => [...prev, response]);
    };
    fetchData();
  };

  return (
    <>
      <Header />
      <ChatWrapper>
        <ChatInner>
          <ChatCategory>
            {chatRoom.map((room) => (
              <CateLink
                key={room.id}
                className={room.id === roomId ? "highlight" : ""}
              >
                <div
                  className="catelink__wrap"
                  onClick={() => {
                    handleClick(room.id);
                    setIsShowRoom(true);
                  }}
                >
                  <div className="catelink__name">
                    <p className="tit">{room.name}</p>
                    <p className="content">
                      {room.latestMessage?.text || "메시지가 없습니다."}
                    </p>
                  </div>
                  <div className="catelink__time">{room.updatedAt}</div>
                </div>
              </CateLink>
            ))}
          </ChatCategory>
          <CatePlus>
            <ModalPlus
              setRoomName={setRoomName}
              setSelectedUsers={setSelectedUsers}
              addNewChatRoom={addNewChatRoom}
              loginUser={loginUser}
            />
          </CatePlus>
        </ChatInner>
        {isShowRoom ? (
          chatRoom.length !== 0 ? (
            <ChatRoom
              roomId={roomId}
              setChatRoom={setChatRoom}
              setIsShowRoom={setIsShowRoom}
            />
          ) : (
            <NoneChat></NoneChat>
          )
        ) : null}
      </ChatWrapper>
    </>
  );
}

export default Chat;

const ChatWrapper = styled.div`
  display: flex;
  border-left: 1px solid #e8e8e8;
  height: 100%;
  max-width: 850px;
  width: 100%;
  margin: 0 auto;
`;

const ChatInner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 30%;
  max-width: 30%;
`;

const ChatCategory = styled.ul`
  display: flex;
  flex-direction: column;
  /* flex: 1 0 30%;
  max-width: 30%; */
  border-right: 1px solid #e8e8e8;
  height: 540px;
  overflow-y: scroll;
  position: relative;
`;

const CateLink = styled.li`
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
  &.highlight {
    background-color: #feebea;
  }
  .catelink {
    &__wrap {
      gap: 16px;
      width: 100%;
    }
    &__name {
      font-size: 16px;
      .tit {
        margin-bottom: 5px;
        color: black;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-bottom: 2px;
        cursor: pointer;
      }
      .content {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999696;
        margin-bottom: 10px;
        cursor: pointer;
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
  padding: 10px 0;
  border-right: 1px solid #e8e8e8;
  button {
    border: none;
    outline: none;
    background-color: #f5f5f5;
  }
  button:hover {
    cursor: pointer;
  }
  img {
    width: 30px;
  }
`;