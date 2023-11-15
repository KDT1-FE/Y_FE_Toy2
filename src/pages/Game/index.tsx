import { Button, Card, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameChat from "../../components/Game/GameChat";
import useFireFetch from "../../hooks/useFireFetch";
import GameStart from "../../components/Game/GameStart";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/atoms/userState";
import connect from "../../socket/socket";

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

// interface Categories {
//   category: string;
//   keyword: string[];
// }
// [];

const Game = () => {
  const user = useRecoilValue(userState);

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  const fireFetch = useFireFetch();
  const gameData = fireFetch.useGetSome("game", "id", gameId as string);
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const [category, setCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [liar, setLiar] = useState("");

  console.log(category, keyword);

  const socket = connect(gameId as string);

  useEffect(() => {
    if (gameData.data && gameData.data.length > 0) {
      setStatus(gameData.data[0].status);
      setUsers(gameData.data?.[0]?.users);
    } else {
      setUsers([]);
    }
  }, [gameData.data]);

  // status 업데이트 함수
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    if (gameId) {
      fireFetch.updateData("game", gameId, { status: newStatus });
    }
  };

  const handleGameInfoReceived = (gameInfo: GameInfo) => {
    setCategory(gameInfo.category);
    setKeyword(gameInfo.keyword);
    setLiar(gameInfo.liar);
    setUsers(gameInfo.users);
    setStatus(gameInfo.status);
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
            updateStatus={updateStatus}
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
