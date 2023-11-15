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
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import useFireFetch from "../../../hooks/useFireFetch";
import { DocumentData } from "firebase/firestore";
import GameCard from "../GameCard";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserConfigModal from "../../../components/Main/UserConfigModal";
import { useAuth } from "../../../hooks/useAuth";
import { authState } from "../../../recoil/atoms/authState";
import CreateGameModal from "../CreateGameModal";
import connect from "../../../socket/socket";
import useInput from "../../../hooks/useInput";
import ChatBubble from "../../common/ChatBubble";
import MyChatBubble from "../../common/MyChatBubble";

interface Message {
  userId: string;
  text: string;
  createdAt: Date;
  id: string;
}

interface ResponseValue {
  accessToken: string; // 사용자 접근 토큰
  refreshToken: string; // access token 발급용 토큰
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

type ChatResponseValue = { chats: Chat[] };

const GameLists = () => {
  const { isAuthenticated } = useRecoilValue(authState);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isUserConfigModalOpen, setIsUserConfigModalOpen] = useState(false);
  const [token, setToken] = useState<ResponseValue>();
  const [gameLists, setGameLists] = useState<(GameRoom | DocumentData)[]>([]);
  const [modal, setModal] = useState(false);
  const { value, onChange } = useInput("");
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const fireFetch = useFireFetch();
  // 소켓 연결
  const socket = connect("9984747e-389a-4aef-9a8f-968dc86a44e4");

  useEffect(() => {
    socket.on("message-to-client", (messageObject) => {
      setMessages((prev) => [...prev, messageObject]);
    });
    return () => {
      socket.off("message-to-client");
    };
  }, [socket]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };
  const handleMessage = () => {
    if (!value) {
      return alert("전송할 메시지를 입력해주세요:)");
    }
    // 메시지 전송하는 부분 구현
    socket.emit("message-to-server", value);
    inputRef?.current?.focus();
  };

  const { result: userInfo }: FetchResultUser = useFetch({
    url: `https://fastcampus-chat.net/user?userId=${token?.id}`,
    method: "GET",
    start: !!token,
  });
  const { loading, result: userList }: FetchResultUserList = useFetch({
    url: "https://fastcampus-chat.net/users",
    method: "GET",
    start: !!token,
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

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (token) {
      setToken(token);
    }
  }, []);

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
                <GameCard key={game.id} game={game} />
              ))}
            </Grid>
          </Box>
          <Box bg="white" borderRadius="5">
            <Box overflowY="auto" maxHeight="200px" height="200px">
              {messages.map((message: Message, index) => (
                <MyChatBubble
                  key={index}
                  userId={message?.userId}
                  text={message?.text}
                />
              ))}
            </Box>
            <InputGroup size="md">
              <Input
                pr="5rem"
                placeholder="Enter password"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
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
                  alt="Dan Abramov"
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
                      alt="Dan Abramov"
                    />
                    <Text>{user.name}</Text>
                  </Box>
                ))
              )}
            </Box>
          </Card>
        </Box>
        {modal ? <CreateGameModal setModal={setModal} socket={socket} /> : null}
      </Container>
    );
  }
};

export default GameLists;
