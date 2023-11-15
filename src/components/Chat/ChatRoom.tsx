import styled from "styled-components";
import ModalHamburger from "../ModalHamburger";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import io, { Socket } from "socket.io-client";
import { AuthContext } from "../../hooks/useAuth";
import { ChatI } from "../../pages/Chat";
import SearchInput from "../SearchInput/SearchInput";

export interface User {
  id: string;
  name: string;
  picture: string;
}

interface ChatRoomProps {
  roomId: string;
  roomName: string;
  selectedUsers: User[];
  setChatRoom: React.Dispatch<React.SetStateAction<ChatI[]>>;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

function ChatRoom({
  roomId,
  roomName,
  selectedUsers,
  setChatRoom
}: ChatRoomProps) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { accessToken } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState<string>("");

  const handleClick = async () => {
    if (socket && text.trim()) {
      socket.emit("message-to-server", text);
      setText("");
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (accessToken) {
      const newSocket = io(
        `https://fastcampus-chat.net/chat?chatId=${roomId}`,
        {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
            serverId: "1601075b"
          }
        }
      );
      setTimeout(() => {
        newSocket.on("message-to-client", (newMessage) => {
          setMessages((prevMessages) => {
            const isDuplicate = prevMessages.some(
              (message) => message.id === newMessage.id
            );
            return isDuplicate ? prevMessages : [...prevMessages, newMessage];
          });
        });
        setTimeout(() => {
          newSocket.on("messages-to-client", (responseData) => {
            // 현재 메시지 상태에 없는 메시지만 추가합니다.
            const newMessages = responseData.messages.filter(
              (newMsg: { id: string }) =>
                !messages.find((msg) => msg.id === newMsg.id)
            );
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
          });
          setTimeout(() => {
            newSocket.emit("fetch-messages");
          }, 100);
        }, 100);
      }, 100);

      setSocket(newSocket);

      return () => {
        newSocket.off("message-to-client");
        newSocket.off("messages-to-client");
        newSocket.disconnect();
      };
    }
  }, [accessToken, roomId, messages]);

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [messages]);

  const convertToKoreanTime = (utcDateString: Date) => {
    const koreanDate = new Date(utcDateString);
    const formattedDate = koreanDate.toLocaleString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Seoul"
    });
    return formattedDate;
  };

  const groupMessagesByDate = (messages: Message[]) => {
    const groupedMessages: Record<string, Message[]> = {};

    messages.forEach((message) => {
      const messageDate = new Date(message.createdAt).toLocaleDateString(
        "ko-KR"
      );
      if (!groupedMessages[messageDate]) {
        groupedMessages[messageDate] = [];
      }
      groupedMessages[messageDate].push(message);
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <ChatRoomWrap>
      <div className="chatroom__tit">
        <div className="tit-bx">
          <p className="tit">{roomName}</p>
          <p className="count">
            <img src="/src/assets/images/user-ico.png" width="14"></img>
            <span className="num">{selectedUsers.length}</span>
          </p>
        </div>
        <div className="util-bx">
          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
            messages={messages}
          />
          <ModalHamburger roomId={roomId} setChatRoom={setChatRoom} />
        </div>
      </div>
      <div className="chatroom__body">
        <div className="scroll-inner">
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <div className="date">
                <h3>{date}</h3>
              </div>
              {groupedMessages[date].map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message.userId === sessionStorage.getItem("userId")
                      ? "message__right"
                      : "message__left"
                  }`}
                >
                  <div className="content">
                    <div className="inner">
                      <span className="name">
                        {message.userId === sessionStorage.getItem("userId")
                          ? ""
                          : message.userId}
                      </span>
                      <span className="bubble" id={message.id}>
                        {message.text}
                      </span>
                    </div>
                    <div className="date">
                      {convertToKoreanTime(message.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="alert">테일러스위프트 님이 퇴장했습니다</div>
          <div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="chatroom__send">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleClick();
              }
            }}
          />
          <button type="submit">
            <img
              src="/src/assets/images/up-arrow-ico.png"
              alt="화살표"
              width="20"
            />
          </button>
        </form>
      </div>
    </ChatRoomWrap>
  );
}

export default ChatRoom;

const ChatRoomWrap = styled.div`
  flex: 1 0 70%;
  max-width: 70%;
  border-right: 1px solid #e8e8e8;
  .chatroom {
    &__tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;
      padding: 10px 20px;
      .tit-bx {
        display: flex;
        align-items: center;
        gap: 10px;
        .img {
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
        .count {
          display: inline-flex;
          align-items: flex-start;
          gap: 5px;
          color: #b3b3b3;
          img {
            filter: brightness(0.7);
          }
        }
      }
      .util-bx {
        display: flex;
        align-items: center;
      }
    }
    &__body {
      padding: 20px;
      padding-bottom: 0;
      font-size: 0.9rem;
      overflow-y: scroll;
      height: 400px;
      .date {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        h3 {
          padding: 15px;
          border-radius: 10px;
          background-color: #eeeeee;
        }
      }
      .message {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        .img {
          border-radius: 50%;
          display: block;
          position: relative;
          overflow: hidden;
          width: 50px;
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
        .content {
          display: flex;
          align-items: flex-end;
          .inner {
            display: flex;
            flex-direction: column;
            margin-top: 20px;
          }
          .name {
            color: #6c6c6c;
            margin-bottom: 10px;
          }
          .bubble {
            background-color: #feebea;
            border-radius: 0 20px 20px 20px;
            max-width: 300px;
            padding: 15px 20px;
            color: #6c6c6c;
            line-height: 1.2;
            &.shake {
              animation: shake 0.4s 2;

              @keyframes shake {
                0%,
                100% {
                  transform: translateX(0);
                }
                25% {
                  transform: translateX(-4px);
                }
                50% {
                  transform: translateX(4px);
                }
                75% {
                  transform: translateX(-4px);
                }
              }
            }
          }
        }
        .date {
          font-size: 13px;
          color: #d9d9d9;
          margin-left: 5px;
        }
        &__right {
          justify-content: flex-end;
          .content {
            flex-direction: row-reverse;
            .bubble {
              border-radius: 20px 0 20px 20px;
            }
            .name {
              margin-left: auto;
            }
          }
          .date {
            margin-right: 5px;
          }
        }
      }
      .alert {
        text-align: center;
        padding: 30px 0;
        color: #6d6d6d;
      }
    }
    &__send {
      padding: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      form {
        display: flex;
        flex-grow: 1;
        gap: 10px;
      }
      input {
        flex-grow: 1;
        background-color: #ececec;
        border: none;
        outline: none;
        border-radius: 20px;
        padding: 0 20px;
        color: #999696;
      }
      button {
        padding: 0;
        flex-shrink: 0;
        background-color: #bab6b5;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
