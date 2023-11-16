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
import UserCount from "./UserCount";
import RoomName from "./RoomName";
import { darkTheme } from "../../style/theme";
import UpArrowIcon from "../../assets/images/up-arrow-ico.png";

export interface User {
  id: string;
  name: string;
  picture: string;
}

interface ChatRoomProps {
  roomId: string;
  setChatRoom: React.Dispatch<React.SetStateAction<ChatI[]>>;
  setIsShowRoom: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

function ChatRoom({ roomId, setChatRoom, setIsShowRoom }: ChatRoomProps) {
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
          newSocket.on("messages-to-client", (responseDta) => {
            setMessages(responseDta.messages);
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
  }, [accessToken, roomId]);

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
          <RoomName roomId={roomId} />
          <UserCount roomId={roomId} />
        </div>
        <div className="util-bx">
          <SearchInput
            searchText={searchText}
            setSearchText={setSearchText}
            messages={messages}
          />
          <ModalHamburger
            roomId={roomId}
            setChatRoom={setChatRoom}
            setIsShowRoom={setIsShowRoom}
          />
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
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     e.preventDefault();
            //     handleClick();
            //   }
            // }}
          />
          <button type="submit">
            <img src={UpArrowIcon} width="20" />
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
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      padding: 10px 20px;

      color: black;
      .tit-bx {
        display: flex;
        align-items: center;
        img {
          display: block;
          filter: brightness(0.8);
          margin-left: 10px;
        }
        .num {
          font-weight: 400;
          color: #cecece;
          margin-left: 3px;
        }
      }
      .util-bx {
        display: flex;
        align-items: center;
        gap: 5px;
        form {
          position: relative;
          input[type="submit"] {
            position: absolute;
            right: 5px;
          }
          input[type="text"] {
            padding-left: 10px;
            padding-right: 30px;
            border-radius: 20px;
          }
        }
      }
    }
    &__body {
      padding: 20px;
      padding-bottom: 0;
      font-size: 0.9rem;
      overflow-y: scroll;
      height: 468px;
      .date {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        h3 {
          padding: 10px 20px;
          border-radius: 20px;
          background-color: #eeeeee;
          color: #383535;
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
      box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 2px 0px;
      padding: 20px;
      display: flex;
      gap: 10px;
      align-items: center;
      form {
        display: flex;
        flex-grow: 1;
        gap: 10px;
      }
      input[type="text"] {
        flex-grow: 1;
        height: 3em;
        background-color: ${({ theme }) =>
          theme === darkTheme ? "#ececec" : "#FEEBE9"};
        border: none;
        outline: none;
        border-radius: 20px;
        padding: 0 20px;
        color: #999696;
        height: 40px;
      }
      button {
        background-color: ${({ theme }) =>
          theme === darkTheme ? "#ececec" : "#FEEBE9"};
        display: inline-flex;
        justify-content: center;
        align-items: center;
        outline: none;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
`;
