import {
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useInput from "../../../hooks/useInput";
import ChatBubble from "../../common/ChatBubble";

interface Message {
  id: string;
  text: string;
}
const GameChat = ({ gameId }) => {
  console.log(gameId);
  const token = JSON.parse(localStorage.getItem("token") as string);

  const socket = io(`https://fastcampus-chat.net/chat?chatId=${gameId}`, {
    extraHeaders: {
      Authorization: `Bearer ${token.accessToken}`,
      serverId: import.meta.env.VITE_APP_SERVER_ID,
    },
  });

  // 메세지 데이터
  const [message, setMessage] = useState<Message>({
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitMessage();
    }
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
          onKeyPress={handleKeyPress}
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
