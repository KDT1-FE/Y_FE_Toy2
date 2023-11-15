import { Button, Card, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameChat from "../../components/Game/GameChat";
import useFireFetch from "../../hooks/useFireFetch";
import GameStart from "../../components/Game/GameStart";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import connect from "../../socket/socket";
import Timer from "../../components/Game/Timer";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

interface ProfileCardProps {
  userId: string;
}

interface GameInfo {
  category: string;
  keyword: string;
  liar: string;
  users: string[];
  status: string;
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

const Game = () => {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  // 게임 진행 상황 상태
  const [current, setCurrent] = useState("개별발언");
  // 현재 발언자 상태
  const [speaking, setSpeaking] = useState("qwer1234");
  // 개별 발언 종료 확인을 위한 상태
  const [num, setNum] = useState(0);

  const fireFetch = useFireFetch();
  const gameData = fireFetch.useGetSome("game", "id", gameId as string);
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  // 게임 소켓 서버 연결
  const socket = connect(gameId as string);
  // 메인 소켓 서버 연결 (메인페이지 상태 변경 통신)
  const socketMain = connect("9984747e-389a-4aef-9a8f-968dc86a44e4");

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [liar, setLiar] = useState("");

  // console.log(category, keyword);

  useEffect(() => {
    setSpeaking(users[0]);
  }, [users]);

  useEffect(() => {
    console.log(num, users.length);
    if (num !== 0 && num === users.length) {
      setCurrent("자유발언");
    }
  }, [num, users]);

  // useEffect(() => {
  //   console.log(current);
  // }, [current]);
  useEffect(() => {
    console.log(current);
    console.log(speaking);
  }, [speaking, users]);

  useEffect(() => {
    if (gameData.data && gameData.data.length > 0) {
      setStatus(gameData.data[0].status);
      setUsers(gameData.data?.[0]?.users);
    } else {
      setUsers([]);
    }
  }, [gameData.data]);

  // 게임 나가기 api 선언 (호출 X)
  const leave = useFetch({
    url: "https://fastcampus-chat.net/chat/leave",
    method: "PATCH",
    data: {
      chatId: gameId,
    },
    start: false,
  });

  const handleGameInfoReceived = (gameInfo: GameInfo) => {
    setCategory(gameInfo.category);
    setKeyword(gameInfo.keyword);
    setLiar(gameInfo.liar);
    setUsers(gameInfo.users);
    setStatus(gameInfo.status);

    setCurrent("개별발언");
    setSpeaking(users[0]);
  };
  console.log(current, speaking);

  if (gameData.data.length === 0) {
    return <p>Loading...</p>;
  }

  if (!gameId) {
    return null;
  }

  return (
    <>
      <Timer current={current} setCurrent={setCurrent} />
      <Grid
        templateColumns="200px 1fr 200px"
        templateRows="60px 1fr"
        gap="20px"
        mt="50px"
      >
        <GridItem>
          <Button
            w="200px"
            mr="20px"
            onClick={() => {
              const newUsers = users.filter((value) => value !== user.id);
              socketMain.emit(
                "message-to-server",
                `${user.id}:${gameId}:)*^$@`,
              );
              fireFetch.updateData("game", gameId as string, {
                users: newUsers,
              });
              leave.refresh();
              navigate("/gameLists");
            }}
          >
            뒤로가기
          </Button>
        </GridItem>
        <GridItem>
          <Card h="100%" justifyContent="center">
            <Center fontWeight="bold">
              {status === "게임중" ? (
                <>
                  <p>주제는 {category} 입니다. &nbsp;</p>

                  {liar === user.id ? (
                    <p>당신은 Liar 입니다. </p>
                  ) : (
                    <p>키워드는 {keyword} 입니다.</p>
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
          />
        </GridItem>
        <GridItem>
          {users?.slice(0, 3).map((user, index) => {
            return <ProfileCard key={index} userId={user}></ProfileCard>;
          })}
        </GridItem>
        <GridItem>
          <GameChat
            socket={socket}
            gameData={gameData.data[0]}
            current={current}
            speaking={speaking}
            num={num}
            player={users}
            setNum={setNum}
            setSpeaking={setSpeaking}
            onGameInfoReceived={handleGameInfoReceived}
          />
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
