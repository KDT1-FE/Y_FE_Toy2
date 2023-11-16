import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useFireFetch from "../../../hooks/useFireFetch";
import { DocumentData } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserConfigModal from "../../../components/Main/UserConfigModal";
import { useAuth } from "../../../hooks/useAuth";
import { authState } from "../../../recoil/atoms/authState";
import { userState } from "../../../recoil/atoms/userState";
import connect from "../../../socket/socket";
import ToastNotice from "../../common/ToastNotice";
import CreateGameModal from "../CreateGameModal";
import GameCard from "../GameCard";
import useInput from "../../../hooks/useInput";
import MyChatBubble from "../../common/MyChatBubble";

interface Message {
  text: string;
  id: string;
}

interface User {
  id: string;
  name: string;
  picture: string;
}
interface FetchResultUser {
  result: {
    user: User;
  };
}
interface FetchResultUserList {
  loading: boolean;
  result: User[];
}

interface Chat {
  id: string;
  name: string;
  users: User[]; // 속한 유저 정보
  isPrivate: boolean;
  latestMessage: Message | null;
  updatedAt: Date;
}

interface Message {
  id: string;
  text: string;
  userId: string;
  createAt: Date;
}

interface GameRoom {
  name: string;
  users: string[];
  isPrivate?: boolean;
  num?: number;
  bg?: string;
  status?: string;
  id: string;
}

interface MessageInfo {
  id: string;
  text: string;
}

type ChatResponseValue = { chats: Chat[] };

const GameLists = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useRecoilValue(authState);

  if (!isAuthenticated) {
    navigate("/");
  }

  useFetch({
    url: "https://fastcampus-chat.net/chat/participate",
    method: "PATCH",
    data: {
      chatId: "617bf718-cfa1-48d2-8007-b402907e540b",
    },
    start: true,
  });
  const fireFetch = useFireFetch();

  const user = useRecoilValue(userState);
  const { logout } = useAuth();

  const [isUserConfigModalOpen, setIsUserConfigModalOpen] = useState(false);
  const [gameLists, setGameLists] = useState<(GameRoom | DocumentData)[]>([]);

  // 메세지 데이터
  const [messages, setMessages] = useState<MessageInfo[]>([]);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // 초대방 정보 데이터
  const [roomData, setRoomData] = useState({
    id: "",
    name: "",
    host: "",
    bg: "",
    users: [""],
  });

  // 팝업 데이터
  const [toastUser, setToastUser] = useState([""]);

  // 토스트 모달
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState(false);

  const { value, onChange } = useInput("");
  const inputRef = useRef<HTMLInputElement>(null);
  // 소켓 연결
  const socket = connect("617bf718-cfa1-48d2-8007-b402907e540b");

  useEffect(() => {
    socket.on("message-to-client", (messageObject) => {
      // 메시지 구분
      if (messageObject.text.slice(-5, -2) === "*&^") {
        // 초대 상태 저장
        const usersArr = JSON.parse(messageObject.text);
        const users = [...usersArr];
        users.pop();
        users.pop();
        const room = usersArr[usersArr.length - 2];

        const copy = [...gameLists];
        copy.push(room);

        setGameLists(copy);
        setToastUser(users);
        setRoomData(room);
      } else if (messageObject.text.endsWith("!#%&(")) {
        // 유저 입장 구분
        const arr = messageObject.text.split(":");
        const gameId = arr[1];
        const userData = arr[0];

        const copy = [...gameLists];
        const index = copy.findIndex((value) => value.id === gameId);

        copy[index].users = [...copy[index].users, userData];

        setGameLists(copy);
      } else if (messageObject.text.endsWith(")*^$@")) {
        // 유저 퇴장 구분
        const arr = messageObject.text.split(":");
        const gameId = arr[1];
        const userData = arr[0];

        const copy = [...gameLists];
        const index = copy.findIndex((value) => value.id === gameId);

        copy[index].users = copy[index].users.filter(
          (value: any) => value !== userData,
        );

        setGameLists(copy);
      } else if (messageObject.text.endsWith("~!@##")) {
        const arr = messageObject.text.split(":");
        const gameId = arr[0];

        const copy = [...gameLists];
        const index = copy.findIndex((value) => value.id === gameId);

        copy[index].status = "게임중";
        setGameLists(copy);
      } else if (messageObject.text.endsWith("~!a%2@##")) {
        const arr = messageObject.text.split(":");
        const gameId = arr[0];

        const copy = [...gameLists];
        const index = copy.findIndex((value) => value.id === gameId);

        copy[index].status = "대기중";
        setGameLists(copy);
      } else {
        // 메시지 데이터, 작성 유저 상태 저장
        const message = {
          id: messageObject.userId,
          text: messageObject.text,
        };

        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("message-to-client");
      socket.off("join");
      socket.off("leave");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  //팝업 변화 감지
  useEffect(() => {
    if (toastUser[0] !== "" && user.id) {
      if (toastUser.includes(user.id)) {
        setToast(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastUser]);

  const { result: userInfo }: FetchResultUser = useFetch({
    url: `https://fastcampus-chat.net/user?userId=${user.id}`,
    method: "GET",
    start: !!user,
  });
  const { loading, result: userList }: FetchResultUserList = useFetch({
    url: "https://fastcampus-chat.net/users",
    method: "GET",
    start: !!user,
  });
  
  //파이어베이스 게임
  const { data: firebaseGameListsData } = fireFetch.useGetAll("game", "desc");

  //DB에 있는
  const { result: dbGame } = useFetch({
    url: "https://fastcampus-chat.net/chat/all",
    method: "GET",
    start: true,
  });

  const mergeGameListsData = (
    firebaseGame: DocumentData[],
    { chats }: ChatResponseValue,
  ) => {
    const list: (DocumentData | GameRoom)[] = [];
    firebaseGame.forEach((game) => {
      const findData = chats.find((chat) => chat.id === game.id);
      if (findData) {
        list.push({ ...findData, ...game });
      }
    });

    setGameLists(list);
  };

  const toggleUserConfigModal = () => {
    setIsUserConfigModalOpen(!isUserConfigModalOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (firebaseGameListsData && dbGame) {
      mergeGameListsData(firebaseGameListsData, dbGame);
    }
  }, [firebaseGameListsData, dbGame]);

  const handleMessage = () => {
    if (!value) {
      return alert("전송할 메시지를 입력해주세요:)");
    }
    socket.emit("message-to-server", value);
    inputRef?.current?.focus();
    // clear();
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessage();
    }
  };

  if (isAuthenticated) {
    return (
      <Container
        maxW="container.xl"
        background="url(/src/assets/logo1.png) no-repeat left top #ecedee"
        display="flex"
        width="100%"
        padding="10"
      >
        <Box
          flex="7"
          display="flex"
          flexDirection="column"
          rowGap="5"
          paddingRight="10"
        >
          <Box display="flex" justifyContent="space-between" paddingBottom="5">
            <Text fontSize="3xl" fontWeight="800">
              라이어 게임
            </Text>
            <Button
              bg="blackAlpha.800"
              color="white"
              _hover={{ bg: "blackAlpha.900" }}
              onClick={() => {
                setModal(true);
              }}
            >
              방 만들기
            </Button>
          </Box>
          <Box overflowY="auto" maxHeight="350px">
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
              {gameLists.map((game) => (
                <GameCard key={game.id} game={game} socket={socket} />
              ))}
            </Grid>
          </Box>
          <Box bg="white" borderRadius="5">
            <Card overflowY="auto" maxHeight="200px" height="200px" p={3}>
              {messages.map((message, index) => (
                <MyChatBubble
                  key={index}
                  userId={message?.id}
                  text={message?.text}
                />
              ))}
              <div ref={messageEndRef}></div>
            </Card>
            <InputGroup size="md">
              <Input
                pr="5rem"
                placeholder="내용을 입력하세요"
                onChange={onChange}
                value={value}
                onKeyPress={handleKeyPress}
              />
              <InputRightElement width="5.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  textTransform="uppercase"
                  onClick={handleMessage}
                >
                  enter
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <Box flex="2" display="flex" flexDirection="column" rowGap="5">
          <Card height="160px" padding="5" rowGap="5">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center" columnGap="3">
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  borderRadius="full"
                  src={userInfo?.user.picture}
                />
                <Text>{userInfo?.user.name}</Text>
              </Box>
              <Box display="flex" columnGap="2">
                {/* 설정 아이콘 버튼 */}
                <button onClick={toggleUserConfigModal}>
                  <IoSettingsOutline />
                </button>

                {/* 사용자 설정 모달 */}
                {isUserConfigModalOpen && (
                  <UserConfigModal
                    isOpen={isUserConfigModalOpen}
                    onClose={toggleUserConfigModal}
                  />
                )}
                <BiBell />
              </Box>
            </Box>
            <Button
              onClick={handleLogout}
              width="71px"
              height="32px"
              fontSize="14px"
              bg="blackAlpha.800"
              color="white"
              margin="0 auto"
              _hover={{ bg: "blackAlpha.900", fontWeight: "800" }}
            >
              로그아웃
            </Button>
          </Card>
          <Card padding="3" height="515">
            <Text fontSize="large" fontWeight="800" textAlign="center">
              유저 목록
            </Text>
            <Box
              display="flex"
              flexDirection="column"
              rowGap="5"
              paddingY="3"
              overflowY="auto"
              maxHeight="500px"
            >
              {loading ? (
                <p>loading...</p>
              ) : (
                userList?.map((user, index) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    columnGap="2"
                    backgroundColor="blackAlpha.100"
                    paddingX="3"
                    paddingY="1"
                    borderRadius="5"
                    key={index}
                  >
                    <Image
                      boxSize="35px"
                      objectFit="cover"
                      borderRadius="full"
                      src={user.picture}
                    />
                    <Text>{user.name}</Text>
                  </Box>
                ))
              )}
            </Box>
          </Card>
        </Box>
        {modal ? <CreateGameModal setModal={setModal} socket={socket} /> : null}
        {toast && roomData ? (
          <ToastNotice
            roomData={roomData}
            setToast={setToast}
            socket={socket}
          />
        ) : null}
      </Container>
    );
  }
};

export default GameLists;
