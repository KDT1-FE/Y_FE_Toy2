import GameChat from "../../components/Game/GameChat";
import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import useFireFetch from "../../hooks/useFireFetch";

const ProfileCard = ({ userId }) => {
  return (
    <Card w="200px" h="200px" justify="center" mb="20px">
      <Center>
        <Text fontWeight="bold">{userId}</Text>
      </Center>
    </Card>
  );
};

const Game = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  const fireFetch = useFireFetch();

  const gameData = fireFetch.useGetSome("game", "id", gameId as string);

  console.log(gameData.data);
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
              주제는 “동물” 입니다. 당신이 라이어입니다.
            </Center>{" "}
          </Card>
        </GridItem>
        <GridItem></GridItem>
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
