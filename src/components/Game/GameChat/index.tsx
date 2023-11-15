import {
  Button,
  Card,
  CardBody,
  Center,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../../../recoil/atoms/userState";
import ChatBubble from "../../common/ChatBubble";
import SystemChat from "../../common/SystemChat";
import Vote from "../Vote";
import { Socket } from "../../Main/CreateGameModal";
import MyChatBubble from "../../common/MyChatBubble";

interface Message {
  id: string;
  text: string;
}

interface GameChatProps {
  socket: Socket;
  gameData: any;
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  speaking: string;
  num: number;
  player: string[];
  liar: string;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  setSpeaking: React.Dispatch<React.SetStateAction<string>>;
  onGameInfoReceived: (gameInfo: {
    category: string;
    keyword: string;
    liar: string;
    users: string[];
    status: string;
  }) => void;
}

interface UserResponse {
  users: string[];
  joiners?: string[];
  leaver?: string;
}

const GameChat: React.FC<GameChatProps> = ({
  socket,
  gameData,
  current,
  speaking,
  player,
  num,
  liar,
  setNum,
  setSpeaking,
  onGameInfoReceived,
  setCurrent,
}) => {
  const user = useRecoilValue(userState);
  console.log("Chat/ liar:" + liar);
  const [message] = useState<Message>({
    id: "",
    text: "",
  });
  console.log("current,", current);
  // console.log("GameChat/ gameData:", gameData);
  const [messages, setMessages]: any = useState([]);
  const messageRef = useRef<HTMLInputElement | null>(null);
  const [, setUsers] = useState<string[]>([]);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>("");
  const [voteResult, setVoteResult] = useState<string | null>(null);

  const handleOpenVoteModal = () => {
    setShowVoteModal(true);
  };

  const handleCloseVoteModal = (selectedUser: string) => {
    setShowVoteModal(false);
    setSelectedUser(selectedUser);
  };

  const handleVoteResult = (result: string | null) => {
    setVoteResult(result);
    setCurrent("게임종료");
    console.log("Chat/ voteResult", voteResult);
  };

  useEffect(() => {
    socket.on("message-to-client", (messageObject: any) => {
      // 게임 시작 메시지
      if (messageObject.text.split("~")[1] === "!@##") {
        const gameInfo = JSON.parse(messageObject.text.split("~")[0]);
        onGameInfoReceived(gameInfo);
        return;
      }
      // 게임 종료 메시지
      if (messageObject.text.split("~")[1] === "##@!") {
        const gameInfo = JSON.parse(messageObject.text.split("~")[0]);
        onGameInfoReceived(gameInfo);
        return;
      } else if (messageObject.text.endsWith("~!@%^&")) {
        const arr = messageObject.text.split(":");
        const copy = { ...message };
        copy.id = messageObject.userId;
        copy.text = arr[0];
        setNum((prev) => prev + 1);
        setSpeaking(player[num + 1]);
        setMessages((prevMessages: Message[]) => [
          ...prevMessages,
          { id: messageObject.userId, text: arr[0] },
        ]);
      } else if (messageObject.text.endsWith("%G@#C")) {
        const arr = messageObject.text.split(":");

        if (arr[0] !== "null") {
          setVoteResult(arr[0]);
        }
      } else {
        // 메시지 데이터, 작성 유저 상태 저장
        setMessages((prevMessages: Message[]) => [
          ...prevMessages,
          { id: messageObject.userId, text: messageObject.text },
        ]);
      }
      // 메시지 데이터, 작성 유저 상태 저장
    });
    return () => {
      socket.off("message-to-client");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, voteResult]);

  useEffect(() => {
    // 유저 입장 메시지 수신
    socket.on("join", (responseData: UserResponse) => {
      const systemMessage = `${responseData.joiners!.join} 님이 입장했습니다.`;

      setMessages([...messages, { id: "system", text: systemMessage }]);
      setUsers(responseData.users);
    });

    // 유저 퇴장 메시지 수신
    socket.on("leave", (responseData: UserResponse) => {
      const systemMessage = `${responseData.leaver} 님이 퇴장했습니다.`;
      setMessages([...messages, { id: "system", text: systemMessage }]);
      setUsers(responseData.users);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voteResult, setMessages, socket]);

  const submitMessage = () => {
    if (messageRef.current && messageRef.current.value) {
      const messageValue = messageRef.current.value;
      if (current === "개별발언") {
        socket.emit("message-to-server", messageValue + ":" + "~!@%^&");
      } else {
        socket.emit("message-to-server", messageValue);
      }
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
      <CardBody maxHeight="640px" overflowY="scroll">
        {messages.map((message: Message, index: number) =>
          message.id === "system" ? (
            <SystemChat key={index} text={message.text} />
          ) : message.id === user.id ? (
            <MyChatBubble key={index} userId={message.id} text={message.text} />
          ) : (
            <ChatBubble key={index} userId={message.id} text={message.text} />
          ),
        )}
        {current === "투표중" && (
          <Center>
            <Button size="md" onClick={handleOpenVoteModal}>
              👉 투표하기 👈
            </Button>
          </Center>
        )}
        {showVoteModal && (
          <Vote
            gameData={gameData}
            onClose={handleCloseVoteModal}
            onVoteResult={handleVoteResult}
            socket={socket}
          />
        )}
        {selectedUser && (
          <SystemChat text={`${selectedUser}님을 라이어로 지목했습니다.`} />
        )}
        {voteResult && (
          <>
            <SystemChat
              text={`${voteResult}님이 최종 라이어로 지목되었습니다.`}
            />
            {liar === voteResult ? (
              <SystemChat
                text={`🎉 라이어는 ${liar}님이었습니다. 라이어를 찾아냈습니다! 🎉`}
              />
            ) : (
              <SystemChat
                text={`라이어는 ${liar}님이었습니다. 라이어를 찾아내지 못했습니다.🥲`}
              />
            )}
          </>
        )}
      </CardBody>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="채팅내용"
          ref={messageRef}
          disabled={
            (current === "개별발언" && speaking === user.id) ||
            current === "자유발언" ||
            current === ""
              ? false
              : true
          }
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
