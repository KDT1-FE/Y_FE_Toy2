import {
  Button,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatBubble from "../../common/ChatBubble";

interface Message {
  id: string;
  text: string;
}

interface GameChatProps {
  gameId: string;
}

const GameChat: React.FC<GameChatProps> = ({ gameId }) => {
  const token = JSON.parse(localStorage.getItem("token") as string);

  const socket = io(`https://fastcampus-chat.net/chat?chatId=${gameId}`, {
    extraHeaders: {
      Authorization: `Bearer ${token.accessToken}`,
      serverId: import.meta.env.VITE_APP_SERVER_ID,
    },
  });

  const [message, setMessage] = useState<Message>({
    id: "",
    text: "",
  });
  const [messages, setMessages]: any = useState([]);
  const messageRef = useRef<HTMLInputElement | null>(null);

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
  }, [message.text, message.id]);

  const submitMessage = () => {
    if (messageRef.current && messageRef.current.value) {
      const messageValue = messageRef.current.value;
      socket.emit("message-to-server", messageValue);
      messageRef.current.value = "";
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitMessage();
    }
  };

  return (
    <Card p={3} h="100%" mb="20px">
      <CardBody>
        {messages.map((message: Message, index: number) => (
          <ChatBubble key={index} userId={message.id} text={message.text} />
        ))}
      </CardBody>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="채팅내용"
          ref={messageRef}
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
