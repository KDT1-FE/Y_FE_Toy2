import { Button, Card, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameChat from "../../components/Game/GameChat";
import useFireFetch from "../../hooks/useFireFetch";
import GameStart from "../../components/Game/GameStart";
import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";

interface ProfileCardProps {
  userId: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userId }) => {
  return (
    <Card w="200px" h="200px" justify="center" mb="20px">
      <Center>
        <Text fontWeight="bold">{userId}</Text>
      </Center>
    </Card>
  );
};

interface Categories {
  category: string;
  keyword: string[];
}
[];

const Game = () => {
  const user = useRecoilValue(userState);

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  const fireFetch = useFireFetch();
  const gameData = fireFetch.useGetSome("game", "id", gameId as string);
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);

  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");
  const [liar, setLiar] = useState("");

  console.log(category, keyword);

  const token = JSON.parse(localStorage.getItem("token") as string);

  // const socket = connect(gameId as string);
  const socket = io(`https://fastcampus-chat.net/chat?chatId=${gameId}`, {
    extraHeaders: {
      Authorization: `Bearer ${token.accessToken}`,
      serverId: import.meta.env.VITE_APP_SERVER_ID,
    },
  });

  useEffect(() => {
    if (gameData.data && gameData.data.length > 0) {
      setStatus(gameData.data[0].status);
      setUsers(gameData.data?.[0]?.users);
    } else {
      setUsers([]);
    }
  }, [gameData.data]);

  useEffect(() => {
    // 메시지 수신 리스너 설정
    socket.on("messeage-to-client", (data) => {
      console.log(data);
      const [jsonString, delimiter] = data.text.split("~");

      if (delimiter === "!@") {
        console.log(delimiter);
        try {
          // JSON 문자열 객체로 변환
          const gameInfo = JSON.parse(jsonString);
          console.log("parseData:", gameInfo);
          setCategory(gameInfo.category);
          setKeyword(gameInfo.keyword);
          setLiar(gameInfo.liar);
          setUsers(gameInfo.users);

          // 필요한 작업 수행...
        } catch (error) {
          console.error("JSON Parsing Error: ", error);
          throw error;
        }
      }
    });
    // onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    if (status === "게임중") {
      // 저장된 유저 순서 로컬 스토리지에서 가져오기
      const shuffledUsers = JSON.parse(
        window.localStorage.getItem("shuffledUsers") || "[]",
      );
      setUsers(shuffledUsers);

      const currentCategory = window.localStorage.getItem("category") ?? "";
      const currentKeyword = window.localStorage.getItem("keyword") ?? "";
      const currentLiar = window.localStorage.getItem("liar") ?? "";

      setCategory({ category: currentCategory, keyword: [currentKeyword] });
      setKeyword(currentKeyword);
      setLiar(currentLiar);
    }
  }, [status]);

  // status 업데이트 함수
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    if (gameId) {
      fireFetch.updateData("game", gameId, { status: newStatus });
    }
  };

  if (gameData.data.length === 0) {
    return <p>Loading...</p>;
  }

  if (!gameId) {
    return null;
  }

  return (
    <>
      <Grid
        templateColumns="200px 1fr 200px"
        templateRows="60px 1fr"
        gap="20px"
        mt="50px"
      >
        <GridItem>
          <Button w="200px" mr="20px">
            뒤로가기
          </Button>
        </GridItem>
        <GridItem>
          <Card h="100%" justifyContent="center">
            <Center fontWeight="bold">
              {status === "게임중" ? (
                <>
                  <p>
                    주제는 {window.localStorage.getItem("category")} 입니다.
                    &nbsp;
                  </p>

                  {liar === user.id ? (
                    <p>당신은 Liar 입니다. </p>
                  ) : (
                    <p>
                      키워드는 {window.localStorage.getItem("keyword")} 입니다.
                    </p>
                  )}
                </>
              ) : (
                <p>게임을 시작해주세요.</p>
              )}
            </Center>
          </Card>
        </GridItem>
        <GridItem>
          <GameStart
            socket={socket}
            status={status}
            users={users}
            host={gameData.data[0].host}
            updateStatus={updateStatus}
          />
        </GridItem>
        <GridItem>
          {users?.slice(0, 3).map((user, index) => {
            return <ProfileCard key={index} userId={user}></ProfileCard>;
          })}
        </GridItem>
        <GridItem>
          <GameChat socket={socket} gameData={gameData.data[0]} />
        </GridItem>
        <GridItem>
          <GridItem>
            {users?.slice(3, 6).map((user, index) => {
              return <ProfileCard key={index} userId={user}></ProfileCard>;
            })}
          </GridItem>
        </GridItem>
      </Grid>
    </>
  );
};

export default Game;
