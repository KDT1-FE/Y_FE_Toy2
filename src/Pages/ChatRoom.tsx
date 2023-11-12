import { useState, useEffect, useContext, useCallback } from "react";
import { Socket, io } from "socket.io-client";
import { AuthContext } from "../hooks/useAuth";
import styled from "styled-components";
import useApi from "../hooks/useApi";

export interface Message {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}
interface User {
  id: string;
  name: string;
  picture: string;
}

interface ResponseValue {
  auth: boolean;
  user?: User;
}

const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { accessToken } = useContext(AuthContext);
  const [socket, setSocket] = useState<Socket | null>(null);
  const { getData } = useApi();
  const chatId = "01f1d68b-7dff-4c69-adbd-04d68ccce04c";

  // 현재 로그인한 유저 정보 출력
  useEffect(() => {
    const checkCurrentUser = async () => {
      if (!accessToken) {
        console.log("No access token available.");
        return;
      }
      try {
        const response: ResponseValue = await getData(
          "https://fastcampus-chat.net/auth/me"
        );
        if (response.auth && response.user) {
          const currentUser = response.user;
          const currentUserName = currentUser.name;
          setCurrentUser(response.user);
          console.log("Current User:", currentUserName);
        } else {
          console.log("Authentication failed or no user data.");
        }
      } catch (error) {
        console.error("Error fetching current user information:", error);
      }
    };
    checkCurrentUser();
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && chatId) {
      const newSocket = io(
        `https://fastcampus-chat.net/chat?chatId=${chatId}`,
        {
          extraHeaders: {
            Authorization: `Bearer ${accessToken}`,
            serverId: "1601075b"
          }
        }
      );

      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });

      newSocket.on("connect", () => {
        console.log("Connected to chat socket");
      });

      newSocket.on("error", (error) => {
        console.error("Socket error:", error);
      });

      newSocket.on("message-to-client", (message: Message) => {
        console.log("Received message:", message); // This should log incoming messages
        setMessages((prev) => [...prev, message]);
      });

      newSocket.on("messages-to-client", (data: { messages: Message[] }) => {
        console.log("Received messages from server:", data.messages); // This should log the array of messages
        setMessages(data.messages);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [accessToken, chatId]);

  const sendMessage = useCallback(
    (text: string) => {
      if (socket && text.trim()) {
        console.log("Sending message:", text); // Log the message being sent
        socket.emit(
          "message-to-server",
          { chatId, text },
          (response: string) => {
            // This is an acknowledgement from the server.
            console.log("Server response:", response);
          }
        );
      }
    },
    [socket, chatId]
  );

  const [messageText, setMessageText] = useState("");

  // Handle input field change
  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
  };

  // Handle input field key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && messageText.trim()) {
      sendMessage(messageText);
      setMessageText(""); // Clear the input after sending
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((msg) => (
          <MessageContainer key={msg.id}>
            <p>
              {msg.userId === currentUser?.id ? "Me: " : ""}
              {msg.text}
              <small>{new Date(msg.createdAt).toLocaleTimeString()}</small>
            </p>
          </MessageContainer>
        ))}
      </MessageList>
      <InputContainer>
        <input
          type="text"
          value={messageText}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message and press Enter"
        />
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatRoom;
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 300px;
  background-color: #ffe1e1;
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const MessageContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
`;

const InputContainer = styled.div`
  margin-top: 8px;
`;
