import { Button, Card, Center, Grid, GridItem, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameChat from "../../components/Game/GameChat";
import Keyword from "../../components/Game/Keyword";
import useFireFetch from "../../hooks/useFireFetch";

const ProfileCard = ({ userId }: any) => {
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
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  const fireFetch = useFireFetch();
  const gameData = fireFetch.useGetSome("game", "id", gameId as string);
  const [status, setStatus] = useState("");

  const [category, setCategory] = useState<Categories | null>(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (gameData.data && gameData.data.length > 0) {
      setStatus(gameData.data[0].status);
    }
  }, [gameData.data]);

  useEffect(() => {
    if (status === "게임중") {
      const currentCategory = window.localStorage.getItem("category") ?? "";
      const currentKeyword = window.localStorage.getItem("keyword") ?? "";

      setCategory({ category: currentCategory, keyword: [currentKeyword] });
      setKeyword(currentKeyword);
    }
  }, [status]);

  // status 업데이트 함수
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus);
    if (gameId) {
      fireFetch.updateData("game", gameId, { status: newStatus });
    }
  };

  console.log(gameData.data);
  console.log(category, keyword);

  if (gameData.data.length === 0) {
    return <p>Loading...</p>;
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

                  {window.localStorage.getItem("liar") === "true" ? (
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
          <Button w="200px" mr="20px">
            <Keyword status={status} updateStatus={updateStatus} />
          </Button>
        </GridItem>
        <GridItem>
          <ProfileCard userId={gameData.data[0].host}></ProfileCard>
          <ProfileCard userId={gameData.data[0].users[0]}></ProfileCard>
          <ProfileCard userId={gameData.data[0].users[1]}></ProfileCard>
        </GridItem>
        <GridItem>
          <GameChat gameId={gameId} />
        </GridItem>
        <GridItem>
          <ProfileCard userId={gameData.data[0].users[2]}></ProfileCard>
          <ProfileCard userId={gameData.data[0].users[3]}></ProfileCard>
          <ProfileCard userId={gameData.data[0].users[4]}></ProfileCard>
        </GridItem>
      </Grid>
    </>
  );
};

export default Game;
