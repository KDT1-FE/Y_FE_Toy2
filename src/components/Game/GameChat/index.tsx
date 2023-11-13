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
import SystemChat from "../../common/SystemChat";
import Vote from "../Vote";

interface Message {
  id: string;
  text: string;
}

interface GameChatProps {
  gameId: string;
  gameData: any;
}

interface UserResponse {
  users: string[];
  joiners?: string[];
  leaver?: string;
}

const GameChat: React.FC<GameChatProps> = ({ gameId, gameData }) => {
  console.log("GameChat/ gameData:", gameData);
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
  const [users, setUsers] = useState<string[]>([]);
  console.log("users: ", users);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>("");

  const handleOpenVoteModal = () => {
    setShowVoteModal(true);
  };

  const handleCloseVoteModal = (selectedUser: string) => {
    setShowVoteModal(false);
    setSelectedUser(selectedUser);
  };

  const handleCalculateVoteClose = (finalLiar: string) => {
    // finalLiar를 이용하여 특정 동작 수행 (SystemChat)

    // 선택한 결과 초기화
    setSelectedUser("");
  };

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

  // useEffect(() => {
  //   // 유저 입장 메시지 수신
  //   socket.on("join", (responseData: UserResponse) => {
  //     const systemMessage = `${responseData.joiners.join(
  //       ", ",
  //     )} 님이 입장했습니다.`;
  //     setMessages([...messages, { id: "system", text: systemMessage }]);
  //     setUsers(responseData.users);
  //   });

  //   // 유저 퇴장 메시지 수신
  //   socket.on("leave", (responseData: UserResponse) => {
  //     const systemMessage = `${responseData.leaver} 님이 퇴장했습니다.`;
  //     setMessages([...messages, { id: "system", text: systemMessage }]);
  //     setUsers(responseData.users);
  //   });
  // }, []);

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
        {messages.map((message: Message, index: number) =>
          // 시스템 메시지인 경우 SystemMessage 컴포넌트 사용
          message.id === "system" ? (
            <SystemChat key={index} text={message.text} />
          ) : (
            <ChatBubble key={index} userId={message.id} text={message.text} />
          ),
        )}
        <Button size="md" onClick={handleOpenVoteModal}>
          투표하기
        </Button>
        {showVoteModal && (
          <Vote gameData={gameData} onClose={handleCloseVoteModal} />
        )}
        {selectedUser && (
          <SystemChat text={`${selectedUser}님이 라이어로 선택되었습니다.`} />
        )}
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
