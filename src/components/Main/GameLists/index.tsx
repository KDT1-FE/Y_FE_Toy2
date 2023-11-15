import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import UserConfigModal from "../../../components/Main/UserConfigModal";
import { useAuth } from "../../../hooks/useAuth";
import useFetch from "../../../hooks/useFetch";
import useFireFetch from "../../../hooks/useFireFetch";
import { authState } from "../../../recoil/atoms/authState";
import { userState } from "../../../recoil/atoms/userState";
import connect from "../../../socket/socket";
import ToastNotice from "../../common/ToastNotice";
import CreateGameModal from "../CreateGameModal";
import GameCard from "../GameCard";
import GameListChat from "../GameListsChat";

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

interface MessageInfo {
  id: string;
  text: string;
}

type ChatResponseValue = { chats: Chat[] };

const GameLists = () => {
  // 페이지 입장시 자동으로 해당 채팅방으로 입장
  useFetch({
    url: "https://fastcampus-chat.net/chat/participate",
    method: "PATCH",
    data: {
      chatId: "9984747e-389a-4aef-9a8f-968dc86a44e4",
    },
    start: true,
  });

  const fireFetch = useFireFetch();
  const navigate = useNavigate();

  const { isAuthenticated } = useRecoilValue(authState);
  const user = useRecoilValue(userState);
  const { logout } = useAuth();

  const [isUserConfigModalOpen, setIsUserConfigModalOpen] = useState(false);
  const [token, setToken] = useState<ResponseValue>();
  const [gameLists, setGameLists] = useState<(GameRoom | DocumentData)[]>([]);

  // 메세지 데이터
  const [messages, setMessages] = useState<MessageInfo[]>([]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

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

  const socket = connect("9984747e-389a-4aef-9a8f-968dc86a44e4");

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
      } else if (messageObject.text.endsWith("@#$%")) {
      } else {
        // 메시지 데이터, 작성 유저 상태 저장
        const message = {
          id: messageObject.userId,
          text: messageObject.text,
        };

        console.log(message);
        setMessages((prev) => [...prev, message]);
      }
    });

    // 채팅 기록 확인
    socket.on("messages-to-client", (messagesObject) => {
      console.log(messagesObject);
    });

    // 유저 join확인
    socket.on("join", (users) => {
      console.log(users);
    });

    // 유저 leave확인
    socket.on("leave", (users) => {
      console.log(users);
    });

    return () => {
      socket.off("message-to-client");
      socket.off("join");
      socket.off("leave");
    };
  }, [socket]);

  //팝업 변화 감지
  useEffect(() => {
    if (toastUser[0] !== "" && user.id) {
      if (toastUser.includes(user.id)) {
        console.log(roomData);
        setToast(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastUser]);

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
                <GameCard key={game.id} game={game} socket={socket} />
              ))}
            </Grid>
          </Box>
          <GameListChat />
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
