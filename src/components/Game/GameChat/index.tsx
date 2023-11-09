import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import ChatBubble from "../../common/ChatBubble";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useInput from "../../../hooks/useInput";

interface Message {
  id: string;
  text: string;
}

const GameChat = (gameId) => {
  const token = JSON.parse(localStorage.getItem("token") as string);
  const socket = io(
    `https://fastcampus-chat.net/chat?chatId=e3e9184e-ea74-41e1-b398-3be8d8d84d17`,
    {
      extraHeaders: {
        Authorization: `Bearer ${token.accessToken}`,
        serverId: import.meta.env.VITE_APP_SERVER_ID,
      },
    },
  );

  // 메세지 데이터
  const [message, setMessage] = useState({
    id: "",
    text: "",
  });
  const [messages, setMessages]: any = useState([]);
  const messageValue = useInput("");

  useEffect(() => {
    socket.on("message-to-client", (messageObject) => {
      // 메시지 데이터, 작성 유저 상태 저장
      const copy = { ...message };
      copy.id = messageObject.userId;
      copy.text = messageObject.text;
      setMessage(copy);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  // 메시지 값 변화시(소켓 통신 시) 콘솔에 메시지 데이터 출력
  useEffect(() => {
    if (message.id !== "") {
      console.log(message);
      setMessages([...messages, message]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.text]);

  const submitMessage = () => {
    socket.emit("message-to-server", messageValue.value);
    messageValue.clear();
  };

  return (
    <Card>
      <CardBody>
        {messages.map((message, index) => (
          <ChatBubble key={index} userId={message.id} text={message.text} />
        ))}
      </CardBody>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="채팅내용"
          value={messageValue.value}
          onChange={messageValue.onChange}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={submitMessage}>
            전송
          </Button>
        </InputRightElement>
      </InputGroup>
    </Card>
  );
};

export default GameChat;
