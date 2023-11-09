import GameChat from "../../components/Game/GameChat";
import { Container } from "@chakra-ui/react";
import useFireFetch from "../../hooks/useFireFetch";

const Game = () => {
  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const gameId = searchParams.get("gameId");

  const fireFetch = useFireFetch();

  const gameData = fireFetch.useGetSome("game", "id", gameId as string);

  console.log(gameData.data);
  return (
    <Container maxW="1200px">
      <GameChat gameId={gameId} />
    </Container>
  );
};

export default Game;
